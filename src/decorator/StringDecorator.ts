import { StringSource } from "../string/StringSource";

export class StringDecorator implements StringSource {
  constructor(protected source: StringSource) { }

  next(): Promise<string> { return this.source.next(); }

  protected getRandItem<T>(items: T[]): T {
    // https://stackoverflow.com/a/5915122/2844859
    return items[items.length * Math.random() | 0];
  }
}
