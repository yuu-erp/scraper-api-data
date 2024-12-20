import * as cheerio from 'cheerio';
import MangaScraper, { GetImagesQuery } from 'src/core/MangaScraper';
import logger from 'src/lib/logger';
import { SourceChapter, SourceManga } from 'src/types/data';
import { fulfilledPromises } from 'src/utils';

export default class MangaNettruyenScraper extends MangaScraper {
  constructor() {
    super('netttruyen', 'Nettruyen', { baseURL: 'https://nettruyenviet.com' });
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
    } catch (err) {
      logger.error(err);
      return [];
    }
  }

  async scrapeManga(sourceId: string): Promise<SourceManga> {
    const { data } = await this.client.get(`/truyen-tranh/${sourceId}`);

    const $ = cheerio.load(data);

    const mainTitle = $('.title-detail').text().trim();

    const altTitle = this.parseTitle($('.other-name').text().trim());
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

  async getImages(query: GetImagesQuery) {
    const { source_media_id, chapter_id } = query;
    console.log({ source_media_id, chapter_id });
    console.log(`/truyen-tranh/${source_media_id}/${chapter_id}`);

    const { data } = await this.client.get(
      `/truyen-tranh/${source_media_id}/${chapter_id}`,
    );

    return this.composeImages(data);
  }

  composeImages(html: string) {
    const $ = cheerio.load(html);

    const images = $('.page-chapter');

    return images.toArray().map((el) => {
      const imageEl = $(el).find('img');
      const source = imageEl.attr('data-src') as string;

      const protocols = ['http', 'https'];
      const image = protocols.some((protocol) => source.includes(protocol))
        ? source
        : `https:${source}`;

      return {
        image,
        useProxy: true,
      };
    });
  }

  urlToSourceId(url: string) {
    const splitted = url.split('/');
    const slug = splitted[splitted.length - 1];
    return slug;
  }
}
