import { WallHangingProvider } from "../../model/WallHangingProvider";

export class BirthdayWallHangingProvider implements WallHangingProvider {

    getHanging(): string {
        return "streamers";
    }
}
