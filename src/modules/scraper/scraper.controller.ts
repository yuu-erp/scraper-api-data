import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { XApiKeyGuard } from 'src/guards/x-api-key.guard';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @UseGuards(XApiKeyGuard)
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'sourceId', required: true, type: String }) // Tài liệu cho Swagger
  async scraper(@Query('sourceId') sourceId: string) {
    return this.scraperService.execute(sourceId); // Gọi service với sourceId
  }
}
