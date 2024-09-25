import { FlightFeed } from "./FlightFeed";
import { TerminalObserver } from "./TerminalObserver";

main();

function main() {
  const feed = new FlightFeed();
  const observer = new TerminalObserver();
  feed.attach(observer);
  feed.start();
}
