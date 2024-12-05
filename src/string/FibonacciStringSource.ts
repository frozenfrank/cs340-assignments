import { StringSource } from "./StringSource";

export class FibonacciStringSource implements StringSource {
  private last = "";

  private n1 = 0;
  private n2 = 1;

  next(): Promise<string> {
    const n0 = this.n1 + this.n2;
    this.last += n0;
    [this.n1, this.n2] = [this.n2, n0];
    return Promise.resolve(this.last);
  }

}
