import { DirWalker } from "./DirWalker";

class LineCount extends DirWalker {
  private currentLineCount: number;
  private totalLineCount: number = 0;

  public static main(): void {
    let lineCount: LineCount;

    if (process.argv.length === 4) {
      lineCount = new LineCount(process.argv[2], process.argv[3]);
    } else if (process.argv.length === 5 && process.argv[2].match("-r")) {
      lineCount = new LineCount(process.argv[3], process.argv[4], true);
    } else {
      this.usage();
      return;
    }

    lineCount.run();
  }

  private static usage(): void {
    console.log(
      "USAGE: npx ts-node src/LineCount.ts {-r} <dir> <file-pattern>"
    );
  }

  private constructor(
    dirName: string,
    filePattern: string,
    recurse: boolean = false
  ) {
    super(dirName, filePattern, recurse);
  }

  protected override processFile_Start(filePath: string): void {
    this.currentLineCount = 0;
  }
  protected override processFile_Do(filePath: string, lines: string[]): void {
    this.currentLineCount = lines.length;
    this.totalLineCount += this.currentLineCount;
  }
  protected override processFile_Finish(filePath: string): void {
    console.log(`${this.currentLineCount} ${filePath}`);
  }
  protected override printResults(): void {
    console.log(`TOTAL: ${this.totalLineCount}`);
  }
}

LineCount.main();
