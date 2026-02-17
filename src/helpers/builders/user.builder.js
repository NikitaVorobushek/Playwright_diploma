import { faker } from '@faker-js/faker';

export class UserBuilder {
    withInputName() {
        this.name = faker.person.fullName();
        return this;

    }
    withPassword(length = 10) {
        this.password = faker.internet.password({ length: length });
        return this;

    }
    build() {
        const result = { ...this };
        return result;
    }
}