
// 1. What design principle(s) does this code violate?
// 2. Explain how you would refactor this code to improve its design.

export class Course {

	name: string;
	credits: number;

	constructor(name: string, credits: number) {
		this.name = name;
		this.credits = credits;
	}

	static async create(name: string, credits: number): Promise<Course> {

		// ... Code to insert a new Course object into the database ...

	}

	static async find(name: string): Promise<Course | undefined> {

		// ... Code to find a Course object in the database ...

	}

	async update(): Promise<void> {

		// ... Code to update a Course object in the database ...

	}

}
