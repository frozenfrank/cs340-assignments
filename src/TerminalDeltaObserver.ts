import { Flight } from "./entity/Flight";
import { Observer } from "./entity/Observer";

export class TerminalDeltaObserver implements Observer<Flight|null> {
  private prevFlight: Flight | null = null;

  private readonly interestingParams: readonly (keyof Flight)[] = [
    "longitude", "latitude", "velocity", "geo_altitude"
  ];

  onMessage(flight: Flight|null) {
    if (!flight) {
      console.log("Flight over");
      return;
    } else if (this.prevFlight) {
      this.printDifferences(this.prevFlight, flight);
    } else {
      console.log(`Starting flight ${flight.callsign}`, flight);
    }

    this.prevFlight = flight;
  }

  private printDifferences(prev: Flight, nxt: Flight): void {
    let message = `\nFlight ${prev.callsign} update:`;
    for (const param of this.interestingParams) {
      message += `\n  Δ${param}: ${+nxt[param]! - +prev[param]!}`
    }
    console.log(message);
  }
}
