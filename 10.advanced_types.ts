// Intersection types
function extend<First, Second>(first: First, second: Second): First & Second {
	const result: Partial<First & Second> = {};

	for (const prop in first) {
		if (first.hasOwnProperty(prop)) {
			(<First>result)[prop] = first[prop];
		}
	}

	for (const prop in second) {
		if (second.hasOwnProperty(prop)) {
			(<Second>result)[prop] = second[prop];
		}
	}
	return <First & Second>result;
}

class Person3 {
	constructor(public name: string) {}
}

interface Loggable {
	log(name: string): void;
}

class ConsoleLogger implements Loggable {
	log(name: string) {
		console.log('hello', name);
	}
}

const jim = extend(new Person3('Jim'), ConsoleLogger.prototype);
jim.log(jim.name);

// Union Types
function padLeft(value: string, padding: string | number) {
	if (typeof padding === 'number') {
		return Array(padding + 1).join(' ') + value;
	}
	if (typeof padding === 'string') {
		return padding + value;
	}
	throw new Error('123');
}

// 只能使用所有 type 交集的 method
interface Bird1 {
	fly(): void;
	layEggs(): void;
}

interface Fish1 {
	swim(): void;
	layEggs(): void;
}

class Chicken implements Bird1 {
	fly() {
		console.log('chicken fly');
	}
	layEggs() {
		console.log('chicken 4');
	}
}

function getSmallPet(): Fish1 | Bird1 {
	return new Chicken();
}

let pet2 = getSmallPet();
pet2.layEggs();
// pet2.swim() // Error
// pet2.fly(); // Error

// Type Guards and Differentiating Types

let pet3 = getSmallPet();

if ((<Fish1>pet3).swim) {
	(<Fish1>pet3).swim();
}

// User-Defined Type Guards
function isFish1(pet: Fish1 | Bird1): pet is Fish1 {
	return (<Fish1>pet).swim !== undefined;
}

if (isFish1(pet3)) {
	pet3.swim();
}

// typeof type guards
// 不過可以直接寫成 inline
function isNumber(x: any): x is number {
	return typeof x === 'number';
}

// instanceof type guards
interface Padder {
	getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
	constructor(private numSpace: number) {}
	getPaddingString() {
		return Array(this.numSpace + 1).join(' ');
	}
	someExtra(): void {}
}

class StringPadder implements Padder {
	constructor(private value: string) {}
	getPaddingString() {
		return this.value;
	}
}

function getRandomPadder() {
	return Math.random() < 0.5 ? new SpaceRepeatingPadder(4) : new StringPadder('  ');
}

let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
	padder.someExtra(); // type 會自動 narrowed 到 SpaceRepeatingPadder
}

// Nullable types
let sn: string | null = 'foo';
sn = null;

// Optional parameters and properties
function f1(x: number, y?: number) {
	return x + (y || 0);
}

f1(1, undefined);
// f1(1, null); // Error
// y?:number => y: number | undefined

// Type guards and type assertions
function f2(sn: string | null): string {
	if (sn === null) {
		return 'default';
	}
	return sn;
}

function f3(sn: string | null): string {
	return sn || 'default';
}

// Name 有可能是 null 所以會錯誤
// function broken(name: string | null): string {
// 	function postfix(epithet: string) {
// 		return name.charAt(0) + '. the ' + epithet;
// 	}

// 	name = name || 'Bob';
// 	return postfix(name);
// }

function fixed(name: string | null): string {
	function postfix(epithet: string) {
		return name!.charAt(0) + '. the ' + epithet; // 告訴 complier name 不會是 null
	}
	name = name || 'Bob';
	return postfix(name);
}

// Type Aliases
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
	if (typeof n === 'string') {
		return n;
	}

	return n();
}

type Container<T> = { value: T };

type Tree<T> = {
	value: T;
	left: Tree<T>;
	right: Tree<T>;
};

type LinkedList<T> = T & { next: LinkedList<T> };

interface Person4 {
	name: string;
}

let people1!: LinkedList<Person4>;

let s = people1.next.name;

// Interface vs type aliases

type Alias = { num: number };
interface Interface {
	num: number;
}
// aliased would return object literal type
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;

// Type can not be extended or implemted from

// String Literal Types
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

class UIElement {
	animate(dx: number, dy: number, easing: Easing) {
		if (easing === 'ease-in') {
			console.log(dx, dy, easing);
		} else if (easing === 'ease-out') {
			console.log(dx, dy, easing);
		} else if (easing === 'ease-in-out') {
			console.log(dx, dy, easing);
		}
	}
}

// Numeric Literal Types
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
	return 6;
}

// Discriminated Unions
interface Square1 {
	kind: 'square';
	size: number;
}
interface Rectangle1 {
	kind: 'rectangle';
	width: number;
	height: number;
}
interface Circle1 {
	kind: 'circle';
	radius: number;
}

type Shape1 = Square1 | Rectangle1 | Circle1;

function area(s: Shape1) {
	switch (s.kind) {
		case 'square':
			return s.size * s.size;
		case 'rectangle':
			return s.height * s.width;
		case 'circle':
			return Math.PI * s.radius ** 2;
	}
}

// Exhaustiveness checking
interface Triangle1 {
	kind: 'triangle';
	width: number;
	height: number;
}

type Shape2 = Square1 | Rectangle1 | Circle1 | Triangle1;

// Add number to tell compler missing trangle1 type
// function area1(s: Shape2):number {
// 	switch (s.kind) {
// 		case 'square':
// 			return s.size * s.size;
// 		case 'rectangle':
// 			return s.height * s.width;
// 		case 'circle':
// 			return Math.PI * s.radius ** 2;
// 	}
// }

function assertNever(x: never): never {
	throw new Error(x);
}

function area2(s: Shape2) {
	switch (s.kind) {
		case 'square':
			return s.size * s.size;
		case 'rectangle':
			return s.height * s.width;
		case 'circle':
			return Math.PI * s.radius ** 2;
		// default:
		// return assertNever(s); // Tell compiler to checking missing type
	}
}
