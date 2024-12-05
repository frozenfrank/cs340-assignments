import { ContactManager } from "./contact/ContactManager";
import { Contact } from "./entity/Contact";
import { Table } from "./table/Table";
import { TableData } from "./table/TableData";

function Main() {
  const contactManager: ContactManager = new ContactManager();

  contactManager.addContact(new Contact("James", "Finlinson", "801.663.6233", "finljam@byu.edu"));
  contactManager.addContact(new Contact("Spear", "Mandelbrot", "111.222.3333", "spear@mandelbrot.viz"));
  contactManager.addContact(new Contact("Blackhole", "Mandelbrot", "222.333.4444", "blackhole@mandelbrot.viz"));
  contactManager.addContact(new Contact("T-Bone", "Mandelbrot", "333.444.5555", "tbone@mandelbrot.viz"));
  contactManager.addContact(new Contact("Ghost", "Mandelbrot", "444.555.6666", "ghost@mandelbrot.viz"));
  contactManager.addContact(new Contact("French Dog", "Mandelbrot", "555.666.7777", "frenchdog@mandelbrot.viz"));

  const contactsTable: TableData = null; // TODO: Instantiate the adapter that implements the TableData interface and adapts/wraps the ContactManager
  const table = new Table(contactsTable, (value: any) => process.stdout.write(value));

  table.display();
}

Main();
