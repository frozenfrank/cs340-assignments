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

  private getSmiley() {
    return this.getRandItem(this.smileys);
  }
}
