import { Injectable, NotFoundException } from '@nestjs/common';
import { Manga } from '@prisma/client'; // Nhập model Manga từ Prisma Client
import { PrismaService } from 'src/service/prismaService/prisma.service';
import { Chapter } from 'src/types/data';

@Injectable()
export class MangaService {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy tất cả manga
  async getAllManga(): Promise<Manga[]> {
    return this.prisma.manga.findMany({
      include: { chapters: true }, // Bao gồm các chương liên quan
    });
  }

  // Lấy manga theo ID
  async getMangaById(id: number): Promise<Manga> {
    const manga = await this.prisma.manga.findUnique({
      where: { id },
      include: { chapters: true }, // Bao gồm các chương liên quan
    });

    if (!manga) {
      throw new NotFoundException(`Manga with ID ${id} not found`);
    }

    return manga;
  }

  // Xóa một manga
  async deleteManga(id: number): Promise<Manga> {
    const manga = await this.getMangaById(id); // Kiểm tra xem manga có tồn tại không

    return this.prisma.manga.delete({
      where: { id: manga.id },
    });
  }

  // Lấy tất cả chương của một manga
  async getChaptersByMangaId(mangaId: number): Promise<Chapter[]> {
    await this.getMangaById(mangaId); // Kiểm tra xem manga có tồn tại không

    return this.prisma.chapter.findMany({
      where: { mangaId },
    });
  }

  // Xóa một chương
  async deleteChapter(id: number): Promise<Chapter> {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id },
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return this.prisma.chapter.delete({
      where: { id: chapter.id },
    });
  }
}
