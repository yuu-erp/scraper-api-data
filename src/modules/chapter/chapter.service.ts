import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/service/prismaService/prisma.service';
import { ChapterResponseDto } from './dto/chapter-response.dto';
import { AnilistService } from 'src/service/anilistService/anilist.service';

@Injectable()
export class ChapterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly anilistService: AnilistService,
  ) {}

  async findAll(): Promise<ChapterResponseDto[]> {
    return this.prismaService.manga.findMany();
  }

  async findOne(id: string) {
    console.log('id', id);
    const manga = await this.prismaService.manga.findUnique({
      where: { id },
      include: { chapters: true },
    });

    if (!manga) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
    if (manga.anilistId) {
      const dataAnilist = await this.anilistService.getMangaById(
        manga.anilistId,
      );
      return { ...manga, ...dataAnilist };
    }
    return manga;
  }
}
