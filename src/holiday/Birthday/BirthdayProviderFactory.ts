import { HolidayProviderFactory } from "../../model/HolidayProviderFactory";
import { BirthdayTableclothPatternProvider } from "./BirthdayTableclothPatternProvider";
import { BirthdayWallHangingProvider } from "./BirthdayWallHangingProvider";
import { BirthdayYardOrnamentProvider } from "./BirthdayYardOrnamentProvider";

export const BirthdayFactory: HolidayProviderFactory = {
  getTableclothProvider: () => new BirthdayTableclothPatternProvider(),
  getWallHangingProvider: () => new BirthdayWallHangingProvider(),
  getYardOrnamentProvider: () => new BirthdayYardOrnamentProvider(),
}
