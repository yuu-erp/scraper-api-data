import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import scrapers, { MangaScraperId } from 'src/scrapers';
import { Manga } from 'src/types/data';
import { readFileAndFallback } from 'src/utils/scraper';
import { ScraperDto } from './dto/ScraperDto';

@Injectable()
export class ScraperService {
  constructor() {}

  async execute(payload: ScraperDto): Promise<ApiResponse<Manga[]>> {
    const { sourceId } = payload;
    const animeScrapers = scrapers.manga;
    const scraper = animeScrapers[sourceId as MangaScraperId];
    if (!scraper) {
      throw new NotFoundException(`Source ID ${sourceId} not found`);
    }
    const sources = await readFileAndFallback(`./data/${sourceId}.json`, () =>
      scraper.scrapeAllMangaPages(),
    );
    const mergedSources = await readFileAndFallback(
      `./data/${sourceId}-full.json`,
      () => scraper.scrapeAnilist(sources),
    );
    return {
      message: 'Scraper init successfully!',
      data: [...mergedSources],
    };
  }

  listSourceId(): ApiResponse<{ name: string; id: string }[]> {
    const allScrapers = scrapers.manga;
    const dataChoices = Object.values(allScrapers).map((value) => ({
      name: value.name,
      id: value.id,
    }));

    return {
      message: 'Get list sourceId successfully!',
      data: dataChoices,
    };
  }
}
