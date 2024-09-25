import { Flight } from "./entity/Flight";
import { Observer } from "./entity/Observer";

export class TerminalObserver implements Observer<Flight|null> {
  onMessage(flight: Flight|null) {
    if (!flight) {
      console.log("Flight over");
      return;
    } else {
      console.log(flight);
    }
  }
}
