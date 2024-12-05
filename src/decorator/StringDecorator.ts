import { StringSource } from "../string/StringSource";

export abstract class StringDecorator implements StringSource {
  constructor(protected source: StringSource) { }

  abstract next(): Promise<string>;

  protected getRandItem<T>(items: T[]): T {
    // https://stackoverflow.com/a/5915122/2844859
    return items[items.length * Math.random() | 0];
  }
}
