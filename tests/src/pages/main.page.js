import { test, expect} from '@playwright/test';

export class MainPage {

    constructor(page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'}).describe('Home button');
    }

    async open(url) {
        return test.step (`Переход на страницу ${url} и домой`, async (step) => {
            await this.page.goto(url);
            this.homeLink.click();
        })
    }
}