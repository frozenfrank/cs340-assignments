import { CapitalizerDecorator } from "./decorator/CapitalizerDecorator";
import { ChaosDecorator } from "./decorator/ChaosDecorator";
import { SmileyDecorator } from "./decorator/SmileyDecorator";
import { StringDecorator } from "./decorator/StringDecorator";
import { FibonacciStringSource } from "./string/FibonacciStringSource";
import { JokeStringSource } from "./string/JokeStringSource";
import { SequentialStringSource } from "./string/SequentialStringSource";
import { StringSource } from "./string/StringSource";

interface DemoRun {
  name: string;
  source: StringSource;
  decorators: (typeof StringDecorator)[];
}

const demos: DemoRun[] = [
  {
    name: "Sequential <-- Chaos, Smiley",
    source: new SequentialStringSource(10),
    decorators: [ChaosDecorator, SmileyDecorator],
  },
  {
    name: "Joke <-- Smiley + Capitalizer",
    source: new JokeStringSource(),
    decorators: [SmileyDecorator, CapitalizerDecorator],
  },
  {
    name: "Fibonacci <-- Chaos",
    source: new FibonacciStringSource(),
    decorators: [ChaosDecorator],
  },
];

async function demonstrate() {
  let source: StringSource;
  let result: string;
  for (const demo of demos) {
    console.log("\n\nBEGIN DEMO: " + demo.name);
    source = demo.source;

    const NUM_SAMPLES = 10;

    console.log(`\nGenerating ${NUM_SAMPLES} undecorated samples`)
    for (let i = 0; i < NUM_SAMPLES; ++i) {
      result = await source.next();
      console.log("  " + result);
    }

    for (const Decorator of demo.decorators) {
      source = new Decorator(source);
    }

    console.log(`\nGenerating ${NUM_SAMPLES} decorated samples`)
    for (let i = 0; i < NUM_SAMPLES; ++i) {
      result = await source.next();
      console.log("  " + result);
    }
  }
}

demonstrate();
