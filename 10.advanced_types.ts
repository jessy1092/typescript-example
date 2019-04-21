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
