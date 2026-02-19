import { faker } from '@faker-js/faker';

export class TodoBuilder {
	constructor () {
		//save object
        this.data = {};
    }

	addTitle (length = 25) {
		this.data.title =  faker.string.alpha(length);
		return this;
	}

	addDescription (length = 15) {
		this.data.description = faker.string.alpha(length);
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
