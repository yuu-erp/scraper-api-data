import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { XApiKeyGuard } from 'src/guards/x-api-key.guard';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { Manga } from 'src/types/data';
import { ScraperDto } from './dto/ScraperDto';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @UseGuards(XApiKeyGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async scrape(@Body() payload: ScraperDto): Promise<ApiResponse<Manga[]>> {
    const result = await this.scraperService.execute(payload);
    return result;
  }

  @UseGuards(XApiKeyGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getListSourceId(): ApiResponse<{ name: string; id: string }[]> {
    const ids = this.scraperService.listSourceId();
    return ids;
  }
}
