import { StringSource } from "./StringSource";

export class JokeStringSource implements StringSource {
  async next(): Promise<string> {
    const request = await fetch("https://v2.jokeapi.dev/joke/Misc,Programming?format=txt&safe-mode&type=single");
    return request.text();
  }
}
