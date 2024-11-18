import { YardOrnamentProvider } from "../../model/YardOrnamentProvider";

export class BirthdayYardOrnamentProvider implements YardOrnamentProvider {

    getOrnament(): string {
        return "giant sign";
    }
}
