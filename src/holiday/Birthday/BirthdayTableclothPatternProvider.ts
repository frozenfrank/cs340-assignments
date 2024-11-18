import { TableclothProvider } from "../../model/TableclothProvider";

export class BirthdayTableclothPatternProvider implements TableclothProvider {

    getTablecloth(): string {
        return "birthday candles";
    }
}
