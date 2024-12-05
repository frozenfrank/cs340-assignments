import { Contact } from "../entity/Contact";
import { Justification } from "../entity/Justification";
import { TableData } from "../table/TableData";
import { ContactManager } from "./ContactManager";

interface ColInfo {
  /** The corresponding key in {@linkcode Contact} to read for the value. */
  key: keyof Contact;
  /** The public title. */
  title: string;
  /** The justification type of the column. Default: Center */
  just?: Justification;
  /** The width of the column. Future versions may support dynamic width based on content */
  width: number;
}

export class ContactTableAdaptor implements TableData {
  private cols: ColInfo[] = [
    { key: "firstName", title: "First Name", width: 5 },
    { key: "lastName", title: "Last", width: 5 },
    { key: "phone", title: "Phone", width: 5 },
    { key: "email", title: "Email", width: 5 },
  ];

  constructor(private contacts: ContactManager) { }

  getColumnCount(): number {
    return this.cols.length;
  }
  getRowCount(): number {
    return this.contacts.getContactCount();
  }
  getColumnSpacing(): number {
    return 2;
  }
  getRowSpacing(): number {
    return 0;
  }
  getHeaderUnderline(): string {
    return "$";
  }
  getColumnHeader(col: number): string {
    return this.cols[col].title;
  }
  getColumnWidth(col: number): number {
    return this.cols[col].width;
  }
  getColumnJustification(col: number): Justification {
    return this.cols[col].just ?? Justification.Center;
  }
  getCellValue(row: number, col: number): string {
    return this.contacts.getContact(row)[this.cols[col].key];
  }

}
