import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/service/prismaService/prisma.service';
import { ChapterResponseDto } from './dto/chapter-response.dto';

@Injectable()
export class ChapterService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<ChapterResponseDto[]> {
    return this.prismaService.manga.findMany();
  }

  async findOne(id: number) {
    const manga = await this.prismaService.manga.findUnique({
      where: { id },
      include: { chapters: true },
    });
    if (!manga) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }
    return manga;
  }
}
