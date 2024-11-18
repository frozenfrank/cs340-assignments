import { HolidayProviderFactory } from "../../model/HolidayProviderFactory";
import { HalloweenTableclothPatternProvider } from "./HalloweenTableclothPatternProvider";
import { HalloweenWallHangingProvider } from "./HalloweenWallHangingProvider";
import { HalloweenYardOrnamentProvider } from "./HalloweenYardOrnamentProvider";

export const HalloweenFactory: HolidayProviderFactory = {
  getTableclothProvider: () => new HalloweenTableclothPatternProvider(),
  getWallHangingProvider: () => new HalloweenWallHangingProvider(),
  getYardOrnamentProvider: () => new HalloweenYardOrnamentProvider(),
}
