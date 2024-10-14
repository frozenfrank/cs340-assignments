
// 1. What design principles does this code violate?
// 2. Refactor the code to improve its design.

function isLowRiskClient(score: number, income: number, authorized: boolean): boolean {
	if (!((score > 700) ||
		((income >= 40000) && (income <= 100000) && authorized && (score > 500)) ||
		(income > 100000))) {

		return false;
	}
	else {
		return true;
	}
}
