
// 1. Explain how this program violates the High-Quality Abstraction principle.
// 2. Explain how you would refactor the code to improve its design.

/**
 * # Answers
 * 1. Passing primitive `Date` objects into the methods of the `RetirementCalculator` obfuscates the purpose of the method
 *    and also scatters the implementation of related code functions.
 * 2. I would move `getTotalYearsOfService()` into the `Employee` class as a public method.
 * 		This would allow us to make `employmentStartDate` and `employmentEndDate` private variables of `Employee`.
 * 		`getMonthsInLastPosition*()` would also be best moved to a class, but it's not clear if it belongs to `Employee`
 * 		since it's not clear which data it would need to generate it's result.
 */

class Employee {
	public employmentStartDate: Date;
	public employmentEndDate: Date;
}

class RetirementCalculator {
	private employee: Employee;

	public constructor(emp: Employee) {
		this.employee = emp;
	}

	public calculateRetirement(payPeriodStart: Date, payPeriodEnd: Date): number { … }

	private getTotalYearsOfService(startDate: Date, endDate: Date): number { … }

	private getMonthsInLastPosition(startDate: Date, endDate: Date): number { … }

    ...
}
