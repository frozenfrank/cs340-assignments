import { StringSource } from "./StringSource";

export class SequentialStringSource implements StringSource {
  private nextCode: number;
  private minCode: number;
  private maxCode: number;

  constructor(private len = 3, start = 'a', min = 'A', max = '~') {
    this.nextCode = start.charCodeAt(0);
    this.minCode = min.charCodeAt(0);
    this.maxCode = max.charCodeAt(0);
  }

  next(): Promise<string> {
    let all = "";
    let remaining = this.len;
    do {
      all += this.getNext();
    } while (--remaining);
    return Promise.resolve(all);
  }

  private getNext(): string {
    const val = String.fromCharCode(this.nextCode);
    ++this.nextCode;
    if (this.nextCode > this.maxCode) this.nextCode = this.minCode;
    return val;
  }

}
