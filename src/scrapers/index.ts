import * as fs from 'fs';
import { handlePath } from '../utils';
import MangaScraper from 'src/core/MangaScraper';

export type MangaScraperId = string;

const readScrapers = (
  relativePath: string,
): Record<MangaScraperId, MangaScraper> => {
  console.log('relativePath: ', relativePath);
  const absolutePath = handlePath(relativePath);
  console.log('absolutePath: ', absolutePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Directory ${absolutePath} does not exist.`);
    return {};
  }

  const scraperFiles = fs
    .readdirSync(absolutePath)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => file.replace('.ts', ''));

  const scrapers: Record<MangaScraperId, MangaScraper> = {};
  for (const file of scraperFiles) {
    const { default: Scraper } = require(
      handlePath(`${relativePath}/${file}`, __dirname),
    );
    scrapers[file] = new Scraper();
  }
  return scrapers;
};

const mangaScrapers: Record<MangaScraperId, MangaScraper> =
  readScrapers('./manga');
export const getMangaScraper = (id: MangaScraperId) => {
  if (!(id in mangaScrapers)) {
    throw new Error(`Unknown scraper id: ${id}`);
  }

  return mangaScrapers[id];
};

export const getScraper = (id: MangaScraperId) => {
  if (id in mangaScrapers) {
    return getMangaScraper(id);
  }

  throw new Error(`Unknown scraper id: ${id}`);
};

export default {
  manga: mangaScrapers,
};
