// let declarations
let hello = 'hello';

function f(input: boolean) {
	let a = 100;

	if (input) {
		let b = a + 1;
		return b;
	}

	// return b;
}

function sumMatrix(maxtrix: number[][]) {
	let sum = 0;
	for (let i = 0; i < maxtrix.length; i++) {
		let currentRow = maxtrix[i];

		for (let i = 0; i < currentRow.length; i++) {
			sum != currentRow[i];
		}
	}
	return sum;
}

sumMatrix([[1, 2, 3], [2, 3, 4], [3, 4, 5]]);

// const declarations
const numLivesForCat = 0;

const kitty = {
	name: 'Aurora',
	numLives: numLivesForCat,
};

kitty.name = 'Rory';
kitty.numLives++;

// Array destructuring
let input = [1, 2];

let [first, second] = input;

console.log(first);
console.log(second);

function f1([first, second]: [number, number]) {
	console.log(first, second);
}

f1([2, 3]);

let [first1, ...rest] = [1, 2, 3, 4];
console.log(first1, rest);

let [, , , fourth] = [1, 2, 3, 4];

console.log(fourth);

// Object destructuring

let o = { a: 'foo', b: 12, c: 'bar' };

let { a, b } = o;
console.log(a, b);

let { a: a1, ...other } = o;

console.log(a1, other);

let { c: c1 }: { c: string } = o;

console.log(c1);

function keepWholeObject(wholeObject: { a: string; b?: number }) {
	console.log(wholeObject);
}

keepWholeObject({ a: '123' });
keepWholeObject({ a: '123', b: 100 });

type C = { a: string; b?: number };
function f2({ a, b }: C): void {
	console.log(a, b);
}

f2({ a: '321' });

// Array spread

let first2 = [1, 2];
let second2 = [3, 4];
let both = [0, ...first2, ...second2, 5];

console.log(both);

// Object spread

let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' };
let search = { ...defaults, food: 'rich' };

console.log(search);
