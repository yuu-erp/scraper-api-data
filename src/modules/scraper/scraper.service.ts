import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import scrapers, { MangaScraperId } from 'src/scrapers';
import { Manga } from 'src/types/data';
import { readFileAndFallback } from 'src/utils/scraper';
import { ScraperDto } from './dto/ScraperDto';
import { PrismaService } from 'src/service/prismaService/prisma.service';

@Injectable()
export class ScraperService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async execute(payload: ScraperDto): Promise<Manga[]> {
    const { sourceId } = payload;
    const animeScrapers = scrapers.manga;
    const scraper = animeScrapers[sourceId as MangaScraperId];
    if (!scraper) {
      throw new NotFoundException(`Source ID ${sourceId} not found`);
    }

    // Đọc và scrape dữ liệu
    const sources = await readFileAndFallback(`./data/${sourceId}.json`, () =>
      scraper.scrapeAllMangaPages(),
    );
    const mergedSources = await readFileAndFallback(
      `./data/${sourceId}-full.json`,
      () => scraper.scrapeAnilist(sources),
    );

    // Lưu dữ liệu vào cơ sở dữ liệu
    for (const mangaData of mergedSources) {
      // Upsert Manga
      const manga = await this.prisma.manga.upsert({
        where: { id: mangaData.sourceMangaConnection.id },
        update: {
          sourceId: mangaData.sourceMangaConnection.sourceId,
          sourceMediaId: mangaData.sourceMangaConnection.sourceMediaId,
          sourceConnectionId: mangaData.sourceMangaConnection.id,
          anilistId: mangaData.anilistId ?? null,
        },
        create: {
          id: mangaData.sourceMangaConnection.id,
          sourceId: mangaData.sourceMangaConnection.sourceId,
          sourceMediaId: mangaData.sourceMangaConnection.sourceMediaId,
          sourceConnectionId: mangaData.sourceMangaConnection.id,
          anilistId: mangaData.anilistId ?? null,
        },
      });

      // Upsert Chapters
      for (const chapter of mangaData.chapters) {
        await this.prisma.chapter.upsert({
          where: {
            mangaId_sourceChapterId: {
              mangaId: manga.id, // ID của manga hiện tại
              sourceChapterId: chapter.sourceChapterId, // ID của chapter trong nguồn
            },
          },
          update: {
            name: chapter.name,
            sourceConnectionId: chapter.sourceConnectionId,
            sourceMediaId: chapter.sourceMediaId,
            sourceId: chapter.sourceId,
            slug: chapter.slug,
          },
          create: {
            name: chapter.name,
            sourceConnectionId: chapter.sourceConnectionId,
            sourceMediaId: chapter.sourceMediaId,
            sourceChapterId: chapter.sourceChapterId,
            sourceId: chapter.sourceId,
            slug: chapter.slug,
            mangaId: manga.id,
          },
        });
      }
    }

    return mergedSources;
  }

  listSourceId(): { name: string; id: string }[] {
    const allScrapers = scrapers.manga;
    const dataChoices = Object.values(allScrapers).map((value) => ({
      name: value.name,
      id: value.id,
    }));

    return dataChoices;
  }
}
