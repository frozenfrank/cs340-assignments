import { HolidayProviderFactory } from "../model/HolidayProviderFactory";
import { TableclothProvider } from "../model/TableclothProvider";
import { WallHangingProvider } from "../model/WallHangingProvider";
import { YardOrnamentProvider } from "../model/YardOrnamentProvider";

export class DecorationPlacer {
  private tableclothPattern:  TableclothProvider;
  private wallHanging:        WallHangingProvider;
  private yardOrnament:       YardOrnamentProvider;

  constructor(providers: HolidayProviderFactory) {
    this.tableclothPattern = providers.getTableclothProvider();
    this.wallHanging = providers.getWallHangingProvider();
    this.yardOrnament = providers.getYardOrnamentProvider();
  }

  placeDecorations(): string {
    return (
      "Everything was ready for the party. The " +
      this.yardOrnament.getOrnament() +
      " was in front of the house, the " +
      this.wallHanging.getHanging() +
      " was hanging on the wall, and the tablecloth with " +
      this.tableclothPattern.getTablecloth() +
      " was spread over the table."
    );
  }
}
