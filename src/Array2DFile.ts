import * as fs from "fs";
import { Array2D } from "./Array2D";

export class Array2DFile implements Array2D {
  private _data: number[][];

  constructor()
  constructor(filename: string)
  constructor(rows: number, columns: number)
  constructor(rowsOrFilename?: string | number, columns?: number) {
    if (typeof rowsOrFilename === "string") {
      const filename = rowsOrFilename;
      this.load(filename);
    } else {
      let rows = 0, cols = 0;
      if (typeof rowsOrFilename === "number") {
        rows = rowsOrFilename;
        cols = columns;
      }
      this.initData(rows, cols);
    }
  }

  private initData(rows: number, cols: number): void {
    this._data = Array.from({ length: rows }, () => Array(cols).fill(undefined));
  }

  getVal(row: number, col: number): number {
    return this._data[row][col];
  }
  setVal(row: number, col: number, value: number): void {
    this._data[row][col] = value;
  }

  load(filename: string): void {
    const fileContents = fs.readFileSync(filename, "utf-8");
    const interpretedData = JSON.parse(fileContents) as number[][];
    // TODO: Validate that the contents actually contain an array of numbers
    this._data = interpretedData;
  }

  save(filename: string): void {
    const fileContents = JSON.stringify(this._data);
    fs.writeFileSync(filename, fileContents, "utf-8");
  }

}