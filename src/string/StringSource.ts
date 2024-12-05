export interface StringSource {
  next(): Promise<string>;
}
