// Numeric enums
enum Direction {
	Up = 1,
	Down,
	Left,
	Right,
}

// Default is 0 start
enum Response1 {
	No,
	Yes,
}

function respond(recipient: string, message: Response1): void {}

respond('Lee', Response1.Yes);

// String enums
enum Direction1 {
	Up = 'UP',
	Down = 'DOWN',
	Left = 'LEFT',
	Right = 'RIGHT',
}

// Heterogeneous enums
enum BooleanLikeHeterogeneousEnum {
	No = 0,
	Yes = 'YES',
}

// Computed and constant members
enum E {
	X,
}

enum FileAccess {
	None,
	Read = 1 << 1,
	Write = 2 << 2,
	ReadWrite = Read | Write,
	G = '123'.length, // computed member
}

// Union enums and enum member types
enum ShapeKind {
	Circle,
	Square,
}

interface Circle {
	kind: ShapeKind.Circle;
	raduis: number;
}

interface Square {
	kind: ShapeKind.Square;
	sideLength: number;
}

let c2: Circle = {
	kind: ShapeKind.Circle, // Error on ShapeKind.Square
	raduis: 100,
};

// Enums at runtime
enum E1 {
	X,
	Y,
	Z,
}

function f(obj: { X: number }) {
	return obj.X;
}

f(E1); // 可以，因為 E1 有 X number property

// Reverse mappings
enum Enum1 {
	A,
}

let a2 = Enum1.A;
let nameOfA = Enum1[a2]; // 可以拿到 'A'

// Reverse Mapping 只是用 number enum, 不支援 string enum

// const enums
const enum Enum2 {
	A = 1,
	B = A * 2,
}

const enum Direction3 {
	Up,
	Down,
	Left,
	Right,
}

let directions = [Direction3.Up, Direction3.Down];
// const enum 會經過 complier time 變成常數
// let directions = [0, 1]

// Ambient enums
declare enum Enum3 {
	A = 1,
	B,
	C = 2,
}
// 聲明已經存在的 enum
