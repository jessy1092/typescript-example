interface LabelledValue {
	label: string;
}

function printLabel(labelledObject: LabelledValue): void {
	console.log(labelledObject.label);
}

const tmpObject = { size: 10, label: 'Size 10 object' };

printLabel(tmpObject);

interface SquareConfig {
	color?: string;
	width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
	let newSquare = { color: 'white', area: 100 };

	if (config.color) {
		newSquare.color = config.color;
	}

	if (config.width) {
		newSquare.area = config.width * config.width;
	}

	return newSquare;
}

console.log(createSquare({ color: 'black' }));

// Readonly properties
interface Point {
	readonly x: number;
	readonly y: number;
}

const p1: Point = { x: 10, y: 20 };

// p1.x = 20; error

let ro: number[] = [1, 2, 3, 4];
let ro1: ReadonlyArray<number> = ro;

// ro1[0] = 12; error

// ro = ro1 as number[]; // 轉型 array or
ro = <number[]>ro1;

console.log(ro);

// Excess Property Checks

let excessSquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); // 強制轉型
// let excessSquare = createSquare(<SquareConfig>{ width: 100, opacity: 0.5 }); // 強制轉型

// 設置 string property 的 type
interface SquareConfig1 {
	color?: string;
	width?: number;
	[propName: string]: any;
}

// Function Types

interface SearchFunc {
	(source: string, subString: string): boolean;
}

let tempSearch: SearchFunc;

tempSearch = function(source, subString) {
	let result = source.search(subString);
	return result > -1;
};

let tempSearch1: SearchFunc;

tempSearch1 = (src, sub) => src.search(sub) > -1;

// Indexable Types

interface StringArray {
	[index: number]: string;
}

let tmpArray: StringArray;
tmpArray = ['123', 'Lee'];

class Animal {
	name: string = '';
}

class Dog extends Animal {
	breed: string = 'nice';
}

// index 為 number 的時候同樣是 string, x[0] === x['0']
// 所以 index 為 Animal 但 Animal 不為 Dog 的 subType 所以會出錯
// interface NotOkay {
// 	[x: number]: Animal;
// 	[x: string]: Dog;
// }
interface NotOkay {
	[x: number]: Dog;
	[x: string]: Animal;
}
