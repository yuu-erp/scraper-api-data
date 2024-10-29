import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterResponseDto } from './dto/chapter-response.dto';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ChapterResponseDto[]> {
    return this.chapterService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chapterService.findOne(id);
  }
}
