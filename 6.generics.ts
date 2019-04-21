function identify<T>(arg: T): T {
	return arg;
}

// Can specific the type
let output = identify<string>('123');

function loggingIdentify<T>(arg: T[]): T[] {
	console.log(arg.length);
	return arg;
}

function loggingIdentifyExplict<T>(arg: Array<T>): Array<T> {
	console.log(arg.length);
	return arg;
}

// Generic Types
let myIdentity: <T>(arg: T) => T = identify;

// object literal type
let myIdentity2: { <T>(arg: T): T } = identify;

// Generic Interface
interface GenericIdentityFn {
	<T>(arg: T): T;
}

let myIdentity3: GenericIdentityFn = identify;

// Generic Interface with parameter
interface GenericIdentityFn1<T> {
	(arg: T): T;
}

// Should define the type on assign
let myIdentity4: GenericIdentityFn1<number> = identify;

// Generic Classes.
// ! call Definite assignment assertions. ref https://devblogs.microsoft.com/typescript/announcing-typescript-2-7/
//  Generic classes are only generic over their instance side rather than their static side
class GenericNumber<T> {
	zeroValue!: T;
	add!: (x: T, y: T) => T;
}

let myGenerricNmber = new GenericNumber<number>();
myGenerricNmber.zeroValue = 0;
myGenerricNmber.add = function(x, y) {
	return x + y;
};

let stringNumberic = new GenericNumber<string>();

stringNumberic.zeroValue = '';
stringNumberic.add = function(x, y) {
	return x + y;
};

// Generic Constraints
interface Lengthwise {
	length: number;
}

function loggingIdentify1<T extends Lengthwise>(arg: T): T {
	console.log(arg.length);
	return arg;
}

// Using Type parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
	return obj[key];
}

let x1 = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x1, 'a');
// getProperty(x1, 'm');

// Using Class Types in Gernerics

// 工廠 function
// It is necessary to refer to class types by their constructor functions
function create1<T>(c: { new (): T }): T {
	return new c();
}

// Use interface :)
interface constructorDeclar<T> {
	new (): T; // Constructor type definition
}

function create2<T>(c: constructorDeclar<T>): T {
	return new c();
}

// Complex example
class BeeKeeper {
	hasMask!: boolean;
}

class Zookeeper {
	nametag!: string;
}

class Animal1 {
	numLegs!: number;
}

class Bee extends Animal1 {
	keeper!: BeeKeeper;
}

class Lion extends Animal1 {
	keeper!: Zookeeper;
}

function createInstance<A extends Animal1>(c: new () => A): A {
	return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
