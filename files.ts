import { readFileSync, writeFileSync } from 'node:fs';

export interface Reader {
  next(): string;
  nextInt(): number;
  hasNext(): boolean;
}

export function getReader(filename: string): Reader {
    // TODO: Replace with buffered reading for improved performance
    const imageStr = readFileSync(filename, {encoding: "utf8"});
    const imageSplit = imageStr.split(/\s+/);

    let currentIndex = 0;
    const next = () => imageSplit[currentIndex++];
    const nextInt = () => parseInt(next());
    const hasNext = () => currentIndex < imageSplit.length;

    return { next, nextInt, hasNext };
}

export function write(filename: string, contents: string) {
  return writeFileSync(filename, contents, {encoding: "utf8"});
}
