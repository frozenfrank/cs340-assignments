import { StringSource } from "../string/StringSource";

export abstract class StringDecorator implements StringSource {
  constructor(protected source: StringSource) { }

  abstract next(): Promise<string>;

}
