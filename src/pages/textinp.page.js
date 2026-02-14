import { test, expect } from "playwright/test";
import { faker } from "@faker-js/faker";

export class TextInputPage {
    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.updBtn = page.locator('#updatingButton');
        
        this.inpText = page.getByRole('textbox', {name: 'Set New Button Name'});
    }
    
    async clickUpdatingBtn () {
        return test.step (`Нажал кнопку Updating Button`, async (step) => {
            await this.updBtn.click();
        })        
    }

    async fillInInputField (newBtnName) {
        return test.step (`Заполнил поле текстом`, async (step) => {
            await this.inpText.fill(newBtnName);
        })        
    }

    async checkTextWithBtn (newBtnName) {
        return test.step (`Сверил значения`, async (step) => {
            await expect(this.updBtn).toContainText(newBtnName);
        })        
    }

    async goHome () {
        return test.step (`Ушел Домой`, async (step) => {
            await this.homeLink.click();
        })
    }

    async goTest () {
        let newBtnName = faker.internet.username();
        
        await this.fillInInputField(newBtnName);
        await this.clickUpdatingBtn();
        await this.checkTextWithBtn(newBtnName);
        
        await this.goHome();
    }
}