import { test, expect} from '@playwright/test';

export class ClickPage {
    constructor(page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'}).describe('Home button');

        this.badBtn = page.getByRole('button', {name: 'Button That Ignores DOM Click Event'});
    }

    async clickButtonTest() {
        await this.badBtn.click();
        //return this.badBtn.toHaveStyle();
    }
}