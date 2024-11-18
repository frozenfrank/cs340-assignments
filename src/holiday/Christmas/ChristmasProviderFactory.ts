import { HolidayProviderFactory } from "../../model/HolidayProviderFactory";
import { ChristmasTableclothPatternProvider } from "./ChristmasTableclothPatternProvider";
import { ChristmasWallHangingProvider } from "./ChristmasWallHangingProvider";
import { ChristmasYardOrnamentProvider } from "./ChristmasYardOrnamentProvider";

export const ChristmasFactory: HolidayProviderFactory = {
  getTableclothProvider: () => new ChristmasTableclothPatternProvider(),
  getWallHangingProvider: () => new ChristmasWallHangingProvider(),
  getYardOrnamentProvider: () => new ChristmasYardOrnamentProvider(),
}
