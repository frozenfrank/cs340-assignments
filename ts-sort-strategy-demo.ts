// TS Sort Strategy Pattern demonstration

// Define interfaces

interface Person {
  id: number;
  rank: number;
  name: string;
}

interface Building {
  id: number;
  internalCode?: string;
  publicName: string;
  floors: number;
  maxCapacity: number;
}

// Demonstrate people sorting

const people: Person[] = [
  { id: 1, name: "Billy", rank: 2 },
  { id: 2, name: "Joe", rank: 1 },
  { id: 3, name: "Adam", rank: 2 },
];

printArray("Raw people", people);

printArray("Name ordered people", people.sort((a, b) =>
  a.name.localeCompare(b.name)));

printArray("Ranked people", people.sort((a, b) =>
  (a.rank - b.rank) ||
  (a.name.localeCompare(b.name))));

// Demonstrate building sorting

const buildings: Building[] = [
  { id: 1, publicName: "JFSB", floors: 5, maxCapacity: 1000 },
  { id: 2, publicName: "JKB", floors: 2, maxCapacity: 2000 },
  { id: 3, publicName: "MARB", floors: 2, maxCapacity: 700 },
];


printArray("Tallest buildings", buildings.sort((a, b) =>
  (b.floors - a.floors) ||
  (a.publicName.localeCompare(b.publicName))));

printArray("Largest buildings", buildings.sort((a, b) =>
  (b.maxCapacity - a.maxCapacity) ||
  (a.publicName.localeCompare(b.publicName))));

// Helpers

function printArray(name: string, arr: object[]): void {
  let out = name + ": [\n";
  arr.map(o => JSON.stringify(o)).forEach(l => out += "  " + l + ",\n");
  out += "]\n";
  console.log(out);
}
