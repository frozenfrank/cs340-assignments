import { CapitalizerDecorator } from "./decorator/CapitalizerDecorator";
import { ChaosDecorator } from "./decorator/ChaosDecorator";
import { SmileyDecorator } from "./decorator/SmileyDecorator";
import { StringDecorator } from "./decorator/StringDecorator";
import { FibonacciStringSource } from "./string/FibonacciStringSource";
import { JokeStringSource } from "./string/JokeStringSource";
import { SequentialStringSource } from "./string/SequentialStringSource";
import { StringSource } from "./string/StringSource";

const NUM_SAMPLES = 10;

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

async function demonstrate(demos: DemoRun[]) {
  let source: StringSource;
  for (const demo of demos) {
    source = demo.source;

    console.log("\n\nBEGIN DEMO: " + demo.name);
    await generateSamples(source, NUM_SAMPLES, "undecorated");

    for (const Decorator of demo.decorators) {
      source = new Decorator(source);
    }

    await generateSamples(source, NUM_SAMPLES, "decorated");
  }
}

async function generateSamples(source: StringSource, numSamples: number, label: string): Promise<void> {
  console.log(`\nGenerating ${numSamples} ${label} samples`);
  let result: string;
  for (let i = 0; i < numSamples; ++i) {
    result = await source.next();
    console.log("  " + result);
  }
}

demonstrate(demos);
