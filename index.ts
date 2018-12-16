interface Bird {
	fly(): any;
	layEggs(): any;
}

interface Fish {
	swim(): any;
	layEgg(): any;
}

function getPet(): Bird | Fish {
	const bird: Bird = {
		fly: () => {
			console.log('fly');
		},
		layEggs: () => {},
	};
	const fish: Fish = {
		swim: () => {
			console.log('swim');
		},
		layEgg: () => {},
	};
	return process.env.NODE_ENV === 'bird' ? bird : fish;
}

function isFish(pet: Bird | Fish): pet is Fish {
	return (<Fish>pet).swim !== undefined;
}

const isBird = (pet: Bird | Fish): pet is Bird => (<Bird>pet).fly !== undefined;

let pet = getPet();

if (isFish(pet)) {
	pet.swim();
}

if (isBird(pet)) {
	pet.fly();
}
