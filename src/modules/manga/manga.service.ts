import { Injectable } from '@nestjs/common';
import scrapers, { MangaScraperId } from 'src/scrapers';

@Injectable()
export class MangaService {
  constructor() {}
  async getImages(payload): Promise<any> {
    const { source_id, source_media_id, chapter_id } = payload;
    const animeScrapers = scrapers.manga;
    const scraper = animeScrapers[source_id as MangaScraperId];
    const images = await scraper.getImages({
      source_id: source_id.toString(),
      source_media_id: source_media_id.toString(),
      chapter_id: `chuong-${chapter_id.toString()}`,
    });

    return images;
  }

  async getManga() {}
}
