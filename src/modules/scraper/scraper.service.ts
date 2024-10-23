import { Injectable } from '@nestjs/common';
import scrapers, { MangaScraperId } from 'src/scrapers';
import { readFileAndFallback } from 'src/utils/scraper';

@Injectable()
export class ScraperService {
  constructor() {}

  async execute(sourceId: string) {
    const animeScrapers = scrapers.manga;
    const scraper = animeScrapers[sourceId as MangaScraperId];
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

  async getListId() {}
}
