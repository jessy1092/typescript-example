function add(x: number, y: number): number {
	return x + y;
}

let myAdd = function(x: number, y: number): number {
	return x + y;
};

// Writing the function type
let myAdd2: (x: number, y: number) => number = function(x: number, y: number): number {
	return x + y;
};

// Arrow function?
let myAdd3 = (x: number, y: number): number => x + y;

// Optional and Default Parameters

function buildName(firstName: string, lastName: string) {
	return firstName + lastName;
}

// let result = buildName('Bob')
// let result = buildName('Bob', 'Adams', 'Sr')
let result = buildName('Bob', 'Adams');

function buildName2(firstName: string, lastName?: string) {
	if (lastName) {
		return firstName + lastName;
	}
	return firstName;
}

let result1 = buildName2('Bob');
// let result2 = buildName2('Bob', 'Adams', 'Sr');
let result2 = buildName2('Bob', 'Adams');

function buildName3(firstName: string, lastName = 'Smith') {
	return firstName + lastName;
}

let result3 = buildName3('Bob');
let result4 = buildName3('Bob', undefined);
// let result5 = buildName3('Bob', 'Adams', 'Src);
let result5 = buildName3('Bob', 'Admas');

function buildName4(firstName = 'Will', lastName: string) {
	return firstName + lastName;
}

// let result6 = buildName4('bob');
// let result6 = buildName4('bob', 'Adams', 'Src');
let result6 = buildName4('bob', 'Smith');
let result7 = buildName4(undefined, 'Smith');

// Rest Parameters

function buildName5(firstName: string, ...restOfName: string[]) {
	return firstName + restOfName.join(' ');
}

let result8 = buildName5('Joseph', 'Samuel', 'Lucas');

// This

interface Card {
	suit: string;
	card: number;
}

interface Deck {
	suits: string[];
	cards: number[];
	createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
	suits: ['Herts', 'Spades', 'Clubs', 'Diamonds'],
	cards: Array(52),
	createCardPicker: function(this: Deck) {
		return () => {
			let pickedCard = Math.floor(Math.random() * 52);
			let pickedSuit = Math.floor(pickedCard / 13);

			return { suit: this.suits[pickedSuit], card: pickedCard & 13 };
		};
	},
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log('card:' + pickedCard.card + 'of' + pickedCard.suit);

// Overloads

let suits = ['Herts', 'Spades', 'Clubs', 'Diamonds'];

// overload function for compiler
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };

function pickCard(x: any): any {
	if (typeof x === 'object') {
		let pickedCard = Math.floor(Math.random() * x.length);
		return pickedCard;
	} else if (typeof x === 'number') {
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}

let myDeck = [
	{ suit: 'Diamonds', card: 2 },
	{ suit: 'Spades', card: 10 },
	{ suit: 'Herts', card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
console.log('card:' + pickedCard1.card + pickedCard1.suit);

let pickedCard2 = pickCard(25);
console.log('card' + pickedCard2.card + pickedCard2.suit);
