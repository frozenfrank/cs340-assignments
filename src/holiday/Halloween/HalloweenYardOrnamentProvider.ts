import { YardOrnamentProvider } from "../../model/YardOrnamentProvider";

export class HalloweenYardOrnamentProvider implements YardOrnamentProvider {

    getOrnament(): string {
        return "jack-o-lantern";
    }
}
