import { YardOrnamentProvider } from "../../model/YardOrnamentProvider";

export class ChristmasYardOrnamentProvider implements YardOrnamentProvider {

    getOrnament(): string {
        return "snowman";
    }
}
