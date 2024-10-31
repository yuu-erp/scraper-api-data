import MangaScraper2 from 'src/core/MangaScraper2';
import { SourceChapter, SourceManga } from 'src/types/data';
import * as cheerio from 'cheerio';
import { fulfilledPromises } from 'src/utils';

export default class MangaNettruyenScraper extends MangaScraper2 {
  id: string;
  name: string;
  constructor() {
    super({ baseURL: 'https://manganettruyen.com' });
    this.id = 'nettruyen';
    this.name = 'Nettruyen';
  }

  async scrapeMangaPage(page: number): Promise<SourceManga[]> {
    try {
      const { data } = await this.client.get('/?page=' + page);
      const $ = cheerio.load(data);
      const mangaList = $('.items .item');

      return fulfilledPromises(
        mangaList.toArray().map((el) => {
          const manga = $(el);

          const slug = this.urlToSourceId(manga.find('a').attr('href') || '');
          return this.scrapeManga(slug);
        }),
      );
    } catch (error) {
      return [];
    }
  }

  async scrapeManga(sourceId: string): Promise<any> {
    const { data } = await this.client.get(`/truyen-tranh/${sourceId}`);

    const $ = cheerio.load(data);

    const mainTitle = $('.title-detail').text().trim();

    const altTitle = [];
    const titles = [mainTitle, ...altTitle];

    const chapters: SourceChapter[] = $('.list-chapter div.chapter')
      .toArray()
      .map((el) => {
        const chapter = $(el).find('a');
        const chapterName = chapter.text().trim();
        const chapter_id = chapter.data('id').toString();
        return {
          name: chapterName,
          sourceChapterId: chapter_id,
          sourceMediaId: sourceId,
        };
      });

    return {
      chapters,
      sourceId: this.id,
      sourceMediaId: sourceId,
      titles,
    };
  }

  urlToSourceId(url: string) {
    const splitted = url.split('/');
    const slug = splitted[splitted.length - 1];
    return slug;
  }
}
