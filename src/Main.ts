import { DecorationPlacer } from "./decoration/DecorationPlacer";
import { BirthdayFactory } from "./holiday/Birthday/BirthdayProviderFactory";
import { ChristmasFactory } from "./holiday/Christmas/ChristmasProviderFactory";
import { HalloweenFactory } from "./holiday/Halloween/HalloweenProviderFactory";
import { HolidayProviderFactory } from "./model/HolidayProviderFactory";

main();

function main(): void {
  celebrateHoliday(HalloweenFactory);
  celebrateHoliday(BirthdayFactory);
  celebrateHoliday(ChristmasFactory);
}

function celebrateHoliday(holidayProvider: HolidayProviderFactory) {
  const decorationPlacer = new DecorationPlacer(holidayProvider);
  console.log(decorationPlacer.placeDecorations());
  console.log("");
}
