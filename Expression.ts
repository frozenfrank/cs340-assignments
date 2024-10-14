
// 1. What design principles does this code violate?
// 2. Refactor the code to improve its design.

/**
 * # Answers
 * 1. Simplicity. Single responsibility responsibility. Decomposition. Readability.
 * 2. Completed below.
 */

function isLowRiskClient(score: number, income: number, authorized: boolean): boolean {
	return isHighCreditScore(score) ||
		isHighIncomeClient(income) ||
		(authorized && isMediumIncomeClient(income) && isAtLeastMediumCreditScore(score));
}


function isAtLeastMediumCreditScore(score: number): boolean {
	return score > 500;
}

function isHighCreditScore(score: number): boolean {
	return score > 700;
}

function isMediumIncomeClient(income: number): boolean {
	return (income >= 40000) && (income <= 100000);
}

function isHighIncomeClient(income: number): boolean {
	return income > 100000;
}
