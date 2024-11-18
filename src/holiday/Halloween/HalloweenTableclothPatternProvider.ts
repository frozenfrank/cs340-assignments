import { TableclothProvider } from "../../model/TableclothProvider";

export class HalloweenTableclothPatternProvider implements TableclothProvider {

    getTablecloth(): string {
        return "ghosts and skeletons";
    }
}
