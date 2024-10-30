import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { Manga } from '@prisma/client';
import { ApiResponse } from 'src/interfaces/api-response.interface';

@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get('/image')
  async getImages(@Query() query: any) {
    const { source_id, source_media_id, chapter_id } = query;
    if (!source_id || !source_media_id || !chapter_id) {
      throw new NotFoundException(
        'Missing required parameters: source_id, source_media_id, chapter_id',
      );
    }

    return this.mangaService.getImages({
      source_id,
      source_media_id,
      chapter_id,
    });
  }
}
