import { StringSource } from "./StringSource";

export class SequentialStringSource implements StringSource {
  private nextCode: number;
  private minCode: number;
  private maxCode: number;

  constructor(start = 'a', min = 'A', max = '~') {
    this.nextCode = start.charCodeAt(0) - 1;
    this.minCode = min.charCodeAt(0);
    this.maxCode = max.charCodeAt(0);
  }

  next(): string {
    const val = String.fromCharCode(this.nextCode);
    ++this.nextCode;
    if (this.nextCode > this.maxCode) this.nextCode = this.minCode;
    return val;
  }

}
