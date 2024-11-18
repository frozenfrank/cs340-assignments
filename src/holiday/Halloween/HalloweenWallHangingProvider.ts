import { WallHangingProvider } from "../../model/WallHangingProvider";

export class HalloweenWallHangingProvider implements WallHangingProvider {

    getHanging(): string {
        return "spider-web";
    }
}
