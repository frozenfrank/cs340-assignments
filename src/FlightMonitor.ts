import { FlightFeed } from "./FlightFeed";
import { TerminalObserver } from "./TerminalObserver";
import { TerminalDeltaObserver } from "./TerminalDeltaObserver";

main();

function main() {
  const feed = new FlightFeed();
  const observer = new TerminalDeltaObserver();
  feed.attach(observer);
  feed.start();
}
