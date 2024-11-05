export interface Array2D<T extends number=number> {
  getVal(row: number, col: number): T;
  setVal(row: number, col: number, value: T): void;
}
