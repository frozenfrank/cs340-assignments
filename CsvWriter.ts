
// 1. Explain why/how this program violates the Single Responsibility Principle
// 2. Explain how you would refactor the program to improve its design.

/**
 * # ANSWERS
 * 1. This class is mainly responsible for converting an CSV-like data structure into a string,
 * 		however, it is here specifically tied to the concrete implementation of writing to `console.log()`.
 *    This would require a nearly-total change to this file just to be able to write to a different place like a device or printer.
 * 2. I would pass in a method via the constructor, or require a concrete class to implement a method `writeChars(chars: string)`.
 *    This would allow usages a `ConsoleCsvWriter` class to define the default for a console, while also supporting a `PrinterCsvWriter` and many others.
 */

export class CsvWriter {

	public write(lines: string[][] ) {
		for (let i = 0; i < lines.length; i++)
			this.writeLine(lines[i]);
	}

	private writeLine(fields: string[]) {
		if (fields.length == 0)
			console.log();
		else {
			this.writeField(fields[0]);

			for (let i = 1; i < fields.length; i++) {
				console.log(",");
				this.writeField(fields[i]);
			}
			console.log();
		}
	}

	private writeField(field: string) {
		if (field.indexOf(',') != -1 || field.indexOf('\"') != -1)
			this.writeQuoted(field);
		else
			console.log(field);
	}

	private writeQuoted(field: string) {
		console.log('\"');
		for (let i = 0; i < field.length; i++) {
			let c: string = field.charAt(i);
			if (c == '\"')
				console.log("\"\"");
			else
				console.log(c);
		}
		console.log('\"');
	}
}
