import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MangaService } from './manga.service';
import { Manga } from '@prisma/client';
import { ApiResponse } from 'src/interfaces/api-response.interface';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  // Lấy danh sách tất cả manga
  @Get()
  async getAllManga(): Promise<ApiResponse<Manga[]>> {
    const mangaList = await this.mangaService.getAllManga();
    return {
      message: 'Fetched all manga successfully!',
      data: mangaList,
    };
  }

  // Lấy chi tiết một manga theo ID
  @Get(':id')
  async getMangaById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Manga>> {
    const manga = await this.mangaService.getMangaById(id);
    return {
      message: `Fetched manga with ID ${id} successfully!`,
      data: manga,
    };
  }
}
