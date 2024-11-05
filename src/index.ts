import { Array2DFile } from "./Array2DFile";

// Create test arrays
createArray("2", 4, 5);
createArray("3", 5, 4);
createArray("4", 15, 15);


function createArray(name: string, rows: number, cols: number) {
  const array = new Array2DFile(rows, cols);

  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      array.setVal(i, j, randomVal());
    }
  }
  array.setVal(0, 0, 3.14);

  const filename = `arrays/array-${name}.json`;
  array.save(filename);
  console.log(`Saved ${rows}x${cols} array to file: ${filename}`);
}

function randomVal() {
  return Math.floor(Math.random() * 100);
}
