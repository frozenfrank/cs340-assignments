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
  /** The width of the column. Omit to use the maximum width of data in the column. */
  width?: number;
}

export class ContactTableAdaptor implements TableData {
  private cols: ColInfo[] = [
    { key: "firstName", title: "First Name", just: Justification.Right },
    { key: "lastName", title: "Last", just: Justification.Left },
    { key: "phone", title: "Phone", width: 15 },
    { key: "email", title: "Email" },
  ];

  private maxWidths: Record<keyof Contact, number>;

  private defaultWidthPadding = 2;

  constructor(private contacts: ContactManager) {
    this.refreshMaxWidths();
  }

  private refreshMaxWidths() {
    const maxWidths: typeof this.maxWidths = {
      firstName: 0,
      lastName: 0,
      phone: 0,
      email: 0
    };
    const keys = this.cols.map(c => c.key);

    let contact: Contact;
    const numContacts = this.contacts.getContactCount();
    for (let i = 0; i < numContacts; ++i) {
      contact = this.contacts.getContact(i);
      for (const key of keys) {
        maxWidths[key] = Math.max(maxWidths[key], contact[key].length);
      }
    }

    this.maxWidths = maxWidths;
  }

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
    const colDef = this.cols[col];
    return colDef.width ?? (this.maxWidths[colDef.key] + this.defaultWidthPadding);
  }
  getColumnJustification(col: number): Justification {
    return this.cols[col].just ?? Justification.Center;
  }
  getCellValue(row: number, col: number): string {
    return this.contacts.getContact(row)[this.cols[col].key];
  }

}
