interface Named {
	name: string;
}

class Person2 {
	name!: string;
}

// Named, Person2 都有相同的 structural
let p: Named;
p = new Person2();

let x2: Named;
let y = { name: 'Alice', location: 'seattle' };
x2 = y;

function greet2(n: Named) {
	console.log('hello', n.name);
}

greet2(y);

// Comparing two functions
let x5 = (a: number) => 0;
let y1 = (b: number, s: string) => 0;

// 函式上，type check 是相容少的 paremter
y1 = x5;
// x5 = y; // Error

let items = [1, 2, 3];

items.forEach((item, index, array) => console.log(item));
items.forEach(item => console.log(item)); // 可以傳較少參數的 function

let x6 = () => ({ name: 'alice' });
let y2 = () => ({ name: 'alice', locaiton: 'seattle' });

// 函式上，type check 是相容較多的 return object
x6 = y2;
// y2 = x6 // Error

// Function Parameter Bivariance
enum EventType {
	Mouse,
	Keyboard,
}

interface Event {
	timestamp: number;
}

interface MouseEvent1 extends Event {
	x: number;
	y: number;
}

interface KeyEvent extends Event {
	keyCode: number;
}

function listenEvent(eventType: EventType, handler: (n: Event) => void) {}

// 雖然 MouseEvent1 繼承 Event
// 但 function parameter 是相容少的 paramter
// MouseEvent 筆 Event property 多，所以會錯誤
// listenEvent(EventType.Mouse, (e: MouseEvent1) => {
// 	console.log(e.x + e.y);
// });

listenEvent(EventType.Mouse, (e: Event) => {
	// 內部轉型
	console.log((<MouseEvent1>e).x + (<MouseEvent1>e).y);
});

// 參數轉型
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent1) => {
	console.log(e.x + e.y);
}));

// listenEvent(EventType.Mouse, (e: number) => console.log(e)); // Error

// Optional Paramrters and Rest Parameters
function invokeLater(args: any[], callback: (...args: any[]) => void) {}

invokeLater([1, 2], (x, y) => console.log(x, y));

// Classes
class Animal5 {
	feet!: number;
	constructor(name: string, numFeet: number) {}
}

class Size {
	feet!: number;
	constructor(numFeet: number) {}
}

let a3!: Animal5;
let s6!: Size;

// class 的 static member 和 constructor 不會影響 compatibility
a3 = s6;
// s6 = a3;

// Generics
interface NotEmpty<T> {
	data: T;
}

let x7: NotEmpty<number>;
let y3: NotEmpty<string>;

// Structural type system 裡面 data 型態不同
// x7 = y3;
