import { test, expect } from "@playwright/test";

export class TextInputPage {
    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.updBtn = page.locator('#updatingButton');
        
        this.inpText = page.getByRole('textbox', {name: 'Set New Button Name'});
    }

    async updButtonName (newBtnName) {
        return test.step('Ввел новое название кнопки и нажал Update', async () => {
            await this.inpText.fill(newBtnName);
            await this.updBtn.click();     
        })
    }

    async goHome () {
        return test.step('Ушел Домой', async () => {
            await this.homeLink.click();    
        })
    }
}