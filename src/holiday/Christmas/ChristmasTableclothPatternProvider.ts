import { TableclothProvider } from "../../model/TableclothProvider";

export class ChristmasTableclothPatternProvider implements TableclothProvider {

    getTablecloth(): string {
        return "holly berries";
    }
}
