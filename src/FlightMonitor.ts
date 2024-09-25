import { FlightFeed } from "./FlightFeed";
import { TerminalObserver } from "./TerminalObserver";
import { TerminalDeltaObserver } from "./TerminalDeltaObserver";

main();

function main() {
  const feed = new FlightFeed();
  feed.attach(new TerminalDeltaObserver());
  feed.attach(new TerminalObserver());
  feed.start();
}
