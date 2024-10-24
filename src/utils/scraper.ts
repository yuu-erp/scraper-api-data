import { readFile } from '.';
import * as path from 'path';

export const readFileAndFallback = <T>(
  pathSub: string,
  fallbackFn?: () => Promise<T>,
) => {
  const fileContent: T = JSON.parse(
    readFile(pathSub, path.resolve(process.cwd(), './')),
  );

  if (!fileContent) return fallbackFn();

  return fileContent;
};
