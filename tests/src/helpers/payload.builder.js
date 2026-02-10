import { faker } from '@faker-js/faker';

export class TodoBuilder {
	constructor () {
		//save object
        this.data = {};
    }

	addTitle (lenght = 25) {
		this.data.title =  faker.string.alpha(lenght);
		return this;
	}

	addDescription (lenght = 15) {
		this.data.description = faker.string.alpha(lenght);
		return this;
	}

	addStatus (boolean) {
		this.data.doneStatus = boolean;
		return this;
	}
    
	generate () {
		//return object
		return { ...this.data };
	}
}