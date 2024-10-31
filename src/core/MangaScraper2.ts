import { RequireAtLeastOne } from 'src/types/utils';
import AxiosConfig from './axiosConfig';
import { AxiosRequestConfig } from 'axios';
import { SourceManga } from 'src/types/data';

export default abstract class MangaScraper extends AxiosConfig {
  constructor(axiosConfig: RequireAtLeastOne<AxiosRequestConfig, 'baseURL'>) {
    super(axiosConfig);
  }

  abstract scrapeMangaPage(_page: number): Promise<SourceManga[]>;

  abstract scrapeManga(_sourceId: string): Promise<SourceManga>;

  async scrapeAllPages(): Promise<SourceManga[]> {
    const list = [];
    let isEnd = false;
    let page = 1;
    while (!isEnd) {
      try {
        const result = await this.scrapeMangaPage(page);

        if (!result) {
          isEnd = true;

          break;
        }

        console.log(`Scraped page ${page}`);

        if (result.length === 0) {
          isEnd = true;

          break;
        }

        page++;

        list.push(result);
      } catch (error) {
        isEnd = true;
      }
    }
    return [];
  }
}
