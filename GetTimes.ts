
// 1. What is the biggest design principle violation in the code below.
// 2. Refactor the code to improve its design.

type Dictionary = {
	[index: string]: string
}

type Times = {
	interval: number;
	duration: number;
	departure: number;
};

function getTimes(props: Dictionary): Times {

	let valueString: string;
	let value: number;

	valueString = props["interval"];
	if (!valueString) {
		throw new Error("missing interval");
	}
	value = parseInt(valueString);
	if (value <= 0) {
		throw new Error("interval must be > 0");
	}
	let interval = value;

	valueString = props["duration"];
	if (!valueString) {
		throw new Error("missing duration");
	}
	value = parseInt(valueString);
	if (value <= 0) {
		throw new Error("duration must be > 0");
	}
	if ((value % interval) != 0) {
		throw new Error("duration % interval != 0");
	}
	let duration = value;

	valueString = props["departure"];
	if (!valueString) {
		throw new Error("missing departure");
	}
	value = parseInt(valueString);
	if (value <= 0) {
		throw new Error("departure must be > 0");
	}
	if ((value % interval) != 0) {
		throw new Error("departure % interval != 0");
	}
	let departure = value;

	return { interval, duration, departure };
}
