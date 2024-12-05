import { StringDecorator } from "./StringDecorator";

export class CapitalizerDecorator extends StringDecorator {
  next(): Promise<string> {
    return this.source.next()
      .then(source => source.toUpperCase());
  }
}
