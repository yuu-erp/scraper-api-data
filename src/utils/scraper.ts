import { readFile } from '.';

export const readFileAndFallback = <T>(
  path: string,
  fallbackFn?: () => Promise<T>,
) => {
  const fileContent: T = JSON.parse(readFile(path));

  console.log(path, !!fileContent);

  if (!fileContent) return fallbackFn();

  return fileContent;
};
