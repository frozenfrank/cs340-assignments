import { TableclothProvider } from "./TableclothProvider";
import { WallHangingProvider } from "./WallHangingProvider";
import { YardOrnamentProvider } from "./YardOrnamentProvider";

export interface HolidayProviderFactory {
  getTableclothProvider(): TableclothProvider;
  getWallHangingProvider(): WallHangingProvider;
  getYardOrnamentProvider(): YardOrnamentProvider;
}
