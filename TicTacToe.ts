
// This program violates the principles of High-Quality Abstraction, Primitive Obsession, and Information Hiding.
//
// 1. Explain why/how this program violates the above principles.
// 2. Explain how you would refactor the code to improve its design.

/**
 * # Answers
 * 1. There are many issues here:
 * 		* The `board` field of `Game` is publicly available, AND the tests rely on that fact.
 * 		* The `board` is obsessively tied to a string array which is a limiting decision
 * 		* The `Game` class is not using `Player` abstractions
 * 		* The `Game` class is concretely implementing one game, when the `move`, `play`, and `winner` methods could be used as template methods for any game.
 * 		* In the `winner()` method, the game is directly accessing chars of the `board` string which info has not been hidden, and which is primitively obsesssed.
 * 2. Several refactors:
 * 		* Create a separate `Board` class that privately contains it's internal data structure
 * 		* Make the `board` field of `Game` a private field
 * 		* Convert `Game` into an abstract class requiring template methods to be implemented
 * 		* Add a `Game.FromString()` static method that encapsulates and handles the string construction of a board
 */

export class Game {

	board: string[];

	constructor(board: string[], position: number = -1, player: string = '') {
		this.board = [...board];

		if (position >= 0 && player !== "") {
			this.board[position] = player;
		}
	}

	move(player: string): number {
		for (let i = 0; i < 9; i++) {
			if (this.board[i] == "-") {
				let game = this.play(i, player);
				if (game.winner() == player) {
					return i;
				}
			}
		}

		for (let i = 0; i < 9; i++) {
			if (this.board[i] == "-") {
				return i;
			}
		}
		return -1;
	}

	play(position: number, player: string): Game {
		return new Game(this.board, position, player);
	}

	winner(): string {
		if (this.board[0] != "-" &&
			this.board[0] == this.board[1] &&
			this.board[1] == this.board[2]) {

			return this.board[0]
		}
		if (this.board[3] != "-" &&
			this.board[3] == this.board[4] &&
			this.board[4] == this.board[5]) {

			return this.board[3]
		}
		if (this.board[6] != "-" &&
			this.board[6] == this.board[7] &&
			this.board[7] == this.board[8]) {
			return this.board[6]
		}

		return "-";
	}
}

export class GameTest {

	testDefaultMove() {
		let game = new Game(this.stringToCharArray("XOXOX-OXO"));
		this.assertEquals(5, game.move('X'));

		game = new Game(this.stringToCharArray("XOXOXOOX-"));
		this.assertEquals(8, game.move('O'));

		game = new Game(this.stringToCharArray("---------"));
		this.assertEquals(0, game.move('X'));

		game = new Game(this.stringToCharArray("XXXXXXXXX"));
		this.assertEquals(-1, game.move('X'));
	}

	testFindWinningMove() {
		let game = new Game(this.stringToCharArray("XO-XX-OOX"));
		this.assertEquals(5, game.move('X'));
	}

	testWinConditions() {
		let game = new Game(this.stringToCharArray("---XXX---"));
		this.assertEquals('X', game.winner());
	}

	private assertEquals(expected: string | number, actual: string | number){
		if (expected !== actual) {
			console.error(`${expected} != ${actual}`);
		}
	}

	private stringToCharArray(str: string): string[] {
		let result: string[] = [];
		for (const char of str) {
			result.push(char);
		}
		return result;
	}
}

// Test Driver

let gameTest = new GameTest();
gameTest.testDefaultMove();
gameTest.testFindWinningMove();
gameTest.testWinConditions();
