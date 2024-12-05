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
  description?: string;
  source: StringSource;
  decorators: (typeof StringDecorator)[];
}

const demos: DemoRun[] = [
  {
    name: "Sequential <-- Chaos, Smiley",
    description: "Demonstrates multiple decorator applications.",
    source: new SequentialStringSource(10),
    decorators: [ChaosDecorator, SmileyDecorator],
  },
  {
    name: "Sequential <-- Smiley, Smiley, Smiley",
    description: "Demonstrates repeated decorator applications.",
    source: new SequentialStringSource(10, '0', '!', '/'),
    decorators: [SmileyDecorator, SmileyDecorator, SmileyDecorator],
  },
  {
    name: "Fibonacci <-- Chaos",
    description: "Show off ChaosDecorator!",
    source: new FibonacciStringSource(),
    decorators: [ChaosDecorator],
  },
  {
    name: "Joke <-- Smiley + Capitalizer",
    description: "Runs slowly due to network requests. Shares funny jokes ;)",
    source: new JokeStringSource(),
    decorators: [SmileyDecorator, CapitalizerDecorator],
  },
];

async function demonstrate(demos: DemoRun[]) {
  let source: StringSource;
  for (const demo of demos) {
    source = demo.source;

    console.log("\n\nBEGIN DEMO");
    console.log("NAME: " + demo.name);
    if (demo.description) {
      console.log("DESCRIPTION: " + demo.description);
    }

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
