class Greeter {
	greeting: string;

	constructor(message: string) {
		this.greeting = message;
	}

	greet() {
		return `Hello, ${this.greeting}`;
	}
}

let greeter = new Greeter('word');

console.log(greeter.greet());

// Inheritance

class Animal2 {
	move(distanceInMeters: number = 0) {
		console.log(`Animal moved ${distanceInMeters}m.`);
	}
}

class Dog2 extends Animal2 {
	bark() {
		console.log('Woof! Woof!');
	}
}

const dog = new Dog2();

dog.bark();
dog.move(10);
dog.move();

class Animal3 {
	private name: string;

	constructor(theName: string) {
		this.name = theName;
	}

	public move(distanceInMeters: number = 0) {
		console.log(`${this.name} moved ${distanceInMeters}m.`);
	}
}

class Snake extends Animal3 {
	constructor(name: string) {
		super(name);
	}

	public move(distanceInMeters = 5) {
		console.log('Slithering...');
		super.move(distanceInMeters);
	}
}

class Horse extends Animal3 {
	constructor(name: string) {
		super(name);
	}

	public move(distanceInMeters = 45) {
		console.log('Galloping...');
		super.move(distanceInMeters);
	}
}

const sam = new Snake('Sammy the Python');
const tom: Animal3 = new Horse('Tommy the Palomino');

sam.move();
tom.move();

// Private 屬性無法直接讀取
// new Animal3('Cate').name;

class Person {
	protected name: string;

	protected constructor(name: string) {
		this.name = name;
	}
}

class Employee extends Person {
	private department: string;

	constructor(name: string, department: string) {
		super(name);
		this.department = department;
	}

	public getElevatorPitch() {
		return `Hello, my name is ${this.name} and I work in ${this.department}.`;
	}
}

const howard = new Employee('Howard', 'Sales');
// Error Person 由於 contructor 是 protected ，所以無法被 instance 但可以被繼承
// const person = new Person('John')

console.log(howard.getElevatorPitch());
// Protected 屬性無法外部存取
// console.log(howard.name);

// Readonly modifier

class Octopus {
	readonly name: string;
	readonly numberOfLegs: number = 8;
	constructor(theName: string) {
		this.name = theName;
	}
}

const dad = new Octopus('Math with the 8 string legs');
// Error readonly 屬性無法修改
// dad.name = 'Man';

class Octopus1 {
	readonly numberOfLegs: number = 9;
	// 簡潔版宣告並附值 name，使用上跟 Octopus 一樣
	constructor(readonly name: string) {}
}

const testOcto = new Octopus1('Hi');
console.log(testOcto.name);

// Accessors

class Employee1 {
	private _fullName: string = '';

	get fullName(): string {
		return this._fullName;
	}

	set fullName(newName: string) {
		this._fullName = newName;
	}
}

let employee = new Employee1();
employee.fullName = 'Lee';

console.log(employee.fullName);

// Static

class Grid {
	static origin = { x: 0, y: 0 };
	calculateDistanceFromOrigin(point: { x: number; y: number }) {
		let xDist = point.x - Grid.origin.x;
		let yDist = point.y - Grid.origin.y;
		return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
	}
	constructor(public scale: number) {}
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

// abstract

abstract class Animal4 {
	abstract makeSound(): void;
	move(): void {
		console.log('Move');
	}
}

abstract class Department {
	constructor(public name: string) {}

	printName(): void {
		console.log('name', this.name);
	}

	abstract printMetting(): void;
}

class AccountDepartment extends Department {
	constructor() {
		super('Accounting');
	}

	printMetting(): void {
		console.log('Account meeting');
	}

	greetingReports(): void {
		console.log('greeting');
	}
}

// abstract class can be the type
let department: Department;

// Error can not instance the abstract class
// department = new Department();

department = new AccountDepartment();

department.printName();
department.printMetting();
// department.greetingReports(); Error, greetingReports not in the abstract class

let accountDepartment = new AccountDepartment();
accountDepartment.greetingReports();

// Advanced Techniques

class Greeter1 {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}

	greet(): string {
		return 'hello' + this.greeting;
	}
}

let greet: Greeter1;
greet = new Greeter1('word');
console.log(greet.greet());

class Greeter2 {
	static standardGreeting: string = 'Hello, there';
	greeting = undefined;
	greet(): string {
		if (this.greeting) {
			return 'hello' + this.greeting;
		}

		return Greeter2.standardGreeting;
	}
}

let greet1: Greeter2;
greet1 = new Greeter2();
console.log(greet1.greet());

let greeterMaker: typeof Greeter2 = Greeter2;
greeterMaker.standardGreeting = 'Hey, there';

let greeter3: Greeter2 = new Greeter2();

console.log('Greet3: ' + greeter3.greet());

let greeter4: Greeter2 = new greeterMaker();
console.log('Greet4: ' + greeter4.greet());

// useing class as an interface

class Point1 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

interface Point3d extends Point1 {
	z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
