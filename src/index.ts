import { Array2DFile } from "./Array2DFile";
import { Array2DLazyFile } from "./Array2DLazyFile";

// Create test arrays
const arrayFiles = [
  createArray("2", 4, 5),
  createArray("3", 5, 4),
  createArray("4", 15, 15),
];
console.log("\n")

// Test the Proxy class on arrays
console.log("Creating proxy objects");
const proxyArrays = arrayFiles.map(filename => new Array2DLazyFile(filename));
// Assert: No console logs
console.log("");

console.log("Accessing vals on proxies");
for (const proxyArray of proxyArrays) {
  console.log("Using proxy array");
  console.log(`  ${proxyArray.getVal(0, 0)}`); // This will trigger one load from disk
  console.log(`  ${proxyArray.getVal(0, 1)}`);
  console.log(`  ${proxyArray.getVal(0, 2)}`);
  console.log(`  ${proxyArray.getVal(1, 0)}`);
  console.log(`  ${proxyArray.getVal(1, 1)}`);
  console.log(`  ${proxyArray.getVal(1, 2)}`);
  console.log(`  ${proxyArray.getVal(2, 2)}`);
  // Only one load event should be registered per array
}
console.log("");


function createArray(name: string, rows: number, cols: number): string {
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
  return filename;
}

function randomVal() {
  return Math.floor(Math.random() * 100);
}
