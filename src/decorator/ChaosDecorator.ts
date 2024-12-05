import { StringDecorator } from "./StringDecorator";

export class ChaosDecorator extends StringDecorator {
  private chaos = [
    "🏴‍☠️🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️", "🏴‍☠️",
    "👾👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾", "👾",
    "😈😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈", "😈",
    "🦍🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍", "🦍",
    "🐗🐗", "🐗", "🐗", "🐗", "🐗", "🐗", "🐗", "🐗", "🐗",
    "🦨🦨", "🦨", "🦨", "🦨", "🦨", "🦨", "🦨", "🦨", "🦨",
    "💩💩", "💩", "💩", "💩", "💩", "💩", "💩",
    "☠️", "☠️", "☠️", "☠️", "☠️", "☠️", "☠️","☠️", "☠️",
    "🦹‍♂️", "🦹‍♂️", "🦹‍♂️", "🦹‍♂️", "🦹‍♂️", "🦹‍♂️",
    "🧨🧨", "🧨", "🧨", "🧨", "🧨", "🧨", "🧨",
    "🦠🦠", "🦠", "🦠", "🦠", "🦠", "🦠", "🦠",
    "🥷🥷🥷", "🥷🥷🥷",
    "❤️‍🔥❤️‍🔥❤️‍🔥",
  ];

  // All probabilities from [0, 1)
  private CHAOS_PROB = 0.1; // Replaces the entire stream
  private CHAOS_MAG_RANGE = 5;
  private CHAOS_MIN_MAG = 3;

  private SAFE_PROP = 0.3;

  private DISRUPTION_PROB = 0.1; // Per character


  async next(): Promise<string> {
    // Always call source so that some data may be dropped to chaos
    const original = await this.source.next();

    if (Math.random() < this.CHAOS_PROB) {
      return this.getTotalChaos();
    }

    if (Math.random() < this.SAFE_PROP) {
      return original;
    }

    return this.doDisturbance(original);
  }

  private getTotalChaos(): string {
    const magnitude = this.CHAOS_MIN_MAG + ((Math.random() * this.CHAOS_MAG_RANGE) | 0);
    let out = [];
    for (let i = 0; i < magnitude; ++i) out.push(this.getChaos());
    return out.join(" ");
  }

  private doDisturbance(original: string): string {
    return original.split("")
      .map(c => (Math.random() < this.DISRUPTION_PROB) ? this.getChaos() : c)
      .join("");
  }

  private getChaos(): string {
    return this.getRandItem(this.chaos);
  }

}
