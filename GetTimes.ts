
// 1. What is the biggest design principle violation in the code below.
// 2. Refactor the code to improve its design.

/**
 * # Answers
 * 1. Code duplication.
 * 2. See code changed below.
 */

type Dictionary = {
	[index: string]: string
}

type Times = {
	interval: number;
	duration: number;
	departure: number;
};

function getTimes(props: Dictionary): Times {

	const interval = extractIntFromProps("interval", props);

	const duration = extractIntFromProps("duration", props);
	enforceMultipleOfInterval("duration", duration, interval);

	const departure = extractIntFromProps("departure", props);
	enforceMultipleOfInterval("departure", departure, interval);

	return { interval, duration, departure };
}

function extractIntFromProps(fieldName: string, props: Dictionary): number | never {
	return extractPositiveInt(fieldName, props[fieldName]);
}

function extractPositiveInt(fieldName: string, valueString: string): number | never {
	if (!valueString) {
		throw new Error("missing " + fieldName);
	}

	const value = parseInt(valueString);
	if (value <= 0) {
		throw new Error("duration must be > 0");
	}
	return value;
}

function enforceMultipleOfInterval(fieldName: string, value: number, interval: number): never | void {
	if ((value % interval) != 0) {
		throw new Error(fieldName + " % interval != 0");
	}
}
