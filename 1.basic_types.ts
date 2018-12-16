// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = 'blue';

let fullName: string = 'Lee';
let age: number = 17;
let sentence: string = `Hello, ${fullName}

Age: ${age + 1}`;

// Array
let list: number[] = [1, 2, 3];

let list2: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number] = ['hello', 10];

console.log(x[0].substr(1));

// Enum
enum Color {
	Red,
	Green,
	Blue,
}

let c: Color = Color.Green;

console.log(c);

let colorName: string = Color[2];

console.log(colorName);

// Any
let notSure: any = 4;
notSure = false;

// 除了 null 和 undefined 之外，都可以是 Object
let prettySure: Object = {};

let list3: any[] = [1, true, 'free'];
list3[1] = 100;

// Void
function warnUser(): void {
	console.log('test');
}

let unusable: void = undefined;
// let unusable1: void = null;

function error(message: string): never {
	throw new Error(message);
}

function fail() {
	return error('Something failed');
}

// object 是表示所有 非 primitive 的 type
// i.e. 以下型態之外 number, string, boolean, symbol, null, or undefined.
// declare 用在已知的外部已經宣告的資源 ex. function, class, variable 等等
// declare function create(o: object): void;
function create(o: object): void {
	console.log(o);
}

create({ props: 0 });
// create('test');

// 除了 null 和 undefined 之外，都可以是 Object
// declare function createObject(o: Object): void;
function createObject(o: Object): void {
	console.log(o);
}

createObject('Test');

let someValue: any = 'This is a string';

let strLength: number = (<string>someValue).length;

// or

let strLength2: number = (someValue as string).length;
