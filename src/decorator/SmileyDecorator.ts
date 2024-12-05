import { StringDecorator } from "./StringDecorator";

export class SmileyDecorator extends StringDecorator {
  private smileys = [
    "😀", "😀", "😀", "😀",
    "😃", "😃", "😃",
    "😁", "😁",
    "😄", "😄",
    "😅",
    "☺️",
  ];

  async next(): Promise<string> {
    const result = await this.source.next();
    const smiley = this.getSmiley();
    return smiley + result + smiley;
  }

  private getSmiley(): string {
    // https://stackoverflow.com/a/5915122/2844859
    return this.smileys[this.smileys.length * Math.random() | 0];
  }

}
