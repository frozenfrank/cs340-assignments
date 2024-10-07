import { DirWalker } from "./DirWalker";

class FileSearch extends DirWalker {
  private totalMatches: number = 0;
  private searchRegExp: RegExp;

  private currentMatchCount: number;

  public static main(): void {
    let fileSearch: FileSearch;

    if (process.argv.length === 5) {
      fileSearch = new FileSearch(
        process.argv[2],
        process.argv[3],
        process.argv[4]
      );
    } else if (process.argv.length === 6 && process.argv[2].match("-r")) {
      fileSearch = new FileSearch(
        process.argv[3],
        process.argv[4],
        process.argv[5],
        true
      );
    } else {
      this.usage();
      return;
    }

    fileSearch.run();
  }

  private static usage(): void {
    console.log(
      "USAGE: npx ts-node src/FileSearch.ts {-r} <dir> <file-pattern> <search-pattern>"
    );
  }


  constructor(
    dirName: string,
    filePattern: string,
    searchPattern: string,
    recurse: boolean = false
  ) {
    super(dirName, filePattern, recurse);
    this.searchRegExp = new RegExp(searchPattern);
  }

  protected processFile_Start(): void {
    this.currentMatchCount = 0;
  }

  protected processFile_Do(filePath: string, lines: string[]): void {
    lines.forEach((line) => {
      if (this.searchRegExp.test(line)) {
        if (++this.currentMatchCount == 1) {
          console.log();
          console.log(`FILE: ${filePath}`);
        }

        console.log(line);
        this.totalMatches++;
      }
    });
  }

  protected processFile_Finish(): void {
    if (this.currentMatchCount > 0) {
      console.log(`MATCHES: ${this.currentMatchCount}`);
    }
  }

  protected printResults(): void {
    console.log();
    console.log(`TOTAL MATCHES: ${this.totalMatches}`);
  }
}

FileSearch.main();
