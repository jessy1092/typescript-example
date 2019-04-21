// Basic

// 自動推導 x3 為 number
let x3 = 3;

// Best common type

// 會自動推導為最符合的 x4 => (number | null)[]
let x4 = [0, 1, null];

class Rhino extends Animal {}
class Elephant extends Animal {}
class Shake extends Animal {}

// 會自動推導為 (Rhino | Elephant | Snake)[]
let zoo = [new Rhino(), new Elephant(), new Shake()];

// Contextual Typing
window.onmousedown = function(mouseEvent) {
	console.log(mouseEvent.button);
	// console.log(mouseEvent.kangaroo); // 沒有此 method
};
