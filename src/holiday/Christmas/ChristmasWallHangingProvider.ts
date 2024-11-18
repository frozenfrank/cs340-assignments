import { WallHangingProvider } from "../../model/WallHangingProvider";

export class ChristmasWallHangingProvider implements WallHangingProvider {

    getHanging(): string {
        return "mistletoe";
    }
}
