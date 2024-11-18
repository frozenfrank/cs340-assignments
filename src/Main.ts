import { DecorationPlacer } from "./decoration/DecorationPlacer";
import { HalloweenFactory } from "./holiday/Halloween/HalloweenProviderFactory";

main();

function main(): void {
  const holidayProvider = HalloweenFactory;
  let decorationPlacer = new DecorationPlacer(holidayProvider);

  console.log(decorationPlacer.placeDecorations());
}
