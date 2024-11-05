import { Array2D } from "./Array2D";
import { Array2DFile } from "./Array2DFile";

export class Array2DLazyFile implements Array2D {
  private _filename: string;
  private arrayFile?: Array2DFile;

  constructor(filename: string) {
    this._filename = filename;
  }

  getVal(...args: Parameters<Array2D["getVal"]>): number {
    this.verifyLoaded();
    return this.arrayFile.getVal(...args);
  }
  setVal(...args: Parameters<Array2D["setVal"]>): void {
    this.verifyLoaded();
    return this.arrayFile.setVal(...args);
  }

  private verifyLoaded(): void {
    if (this.arrayFile) return;
    console.log(`Loading Array2D ${this._filename}`);
    this.arrayFile = new Array2DFile(this._filename);
  }

}
