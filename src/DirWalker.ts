import * as fs from "fs";
import * as path from "path";

export abstract class DirWalker {
  private dirName: string;
  private fileRegExp: RegExp;
  private recurse: boolean;

  protected constructor(
    dirName: string,
    filePattern: string,
    recurse: boolean = false
  ) {
    this.dirName = dirName;
    this.fileRegExp = new RegExp(filePattern);
    this.recurse = recurse;
  }

  public async run() {
    await this.searchDirectory(this.dirName);
    this.printResults();
  }

  private async searchDirectory(filePath: string) {
    if (!this.isDirectory(filePath)) {
      this.nonDirectory(filePath);
      return;
    }

    if (!this.isReadable(filePath)) {
      this.unreadableDirectory(filePath);
      return;
    }

    const files = fs.readdirSync(filePath);

    for (let file of files) {
      const fullPath = path.join(filePath, file);
      if (this.isFile(fullPath)) {
        if (this.isReadable(fullPath)) {
          await this.searchFile(fullPath);
        } else {
          this.unreadableFile(fullPath);
        }
      }
    }

    if (this.recurse) {
      for (let file of files) {
        const fullPath = path.join(filePath, file);
        if (this.isDirectory(fullPath)) {
          await this.searchDirectory(fullPath);
        }
      }
    }
  }

  private isDirectory(path: string): boolean {
    try {
      return fs.statSync(path).isDirectory();
    } catch (error) {
      return false;
    }
  }

  private isFile(path: string): boolean {
    try {
      return fs.statSync(path).isFile();
    } catch (error) {
      return false;
    }
  }

  private isReadable(path: string): boolean {
    try {
      fs.accessSync(path, fs.constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  private nonDirectory(dirName: string): void {
    console.log(`${dirName} is not a directory`);
  }

  private unreadableDirectory(dirName: string): void {
    console.log(`Directory ${dirName} is unreadable`);
  }

  private unreadableFile(fileName: string): void {
    console.log(`File ${fileName} is unreadable`);
  }

  protected async searchFile(filePath: string): Promise<void> {
    if (!this.fileRegExp.test(filePath)) {
      return;
    }

    try {
      this.processFile_Start(filePath);

      const fileContent: string = await fs.promises.readFile(
        filePath,
        "utf-8"
      );
      const lines: string[] = fileContent.split(/\r?\n/);

      this.processFile_Do(filePath, lines);
    } catch (error) {
      this.unreadableFile(filePath);
    } finally {
      this.processFile_Finish(filePath);
    }
  }

  protected abstract processFile_Start(filePath: string): void;

  protected abstract processFile_Do(filePath: string, lines: string[]): void;

  protected abstract processFile_Finish(filePath: string): void;

  protected abstract printResults(): void;

}
