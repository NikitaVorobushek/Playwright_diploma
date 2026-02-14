import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

export class AutorizationPage {

    constructor(page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'}).describe('Home button');

        this.nameInp = page.getByRole('textbox', {name: 'User Name'}).describe('Username field');
        this.passInp = page.getByRole('textbox', {name: '********'}).describe('Password field');

        this.logInBtn = page.getByRole('button', {name: 'Log in'}).describe('Log In button');
        
        this.status = page.locator('#loginstatus').describe('Login status');
    }

    async fillName (username) {
        return test.step (`Заполнил Имя`, async (step) => {
            await this.nameInp.fill(username);
        })        
    }

    async fillPass (password) {
        return test.step (`Заполнил Пароль`, async (step) => {
            await this.passInp.fill(password);
        })        
    }

    async tapOnLogIn () {
        return test.step (`Нажал на кнопку Log In`, async (step) => {
            await this.logInBtn.click();
        })        
    }

    async checkSuccess (username) {
        return test.step (`Проверил успешность "авторизации"`, async (step) => {
            await expect(this.status).toContainText(`Welcome, ${username}!`);
        })        
    }

    async goHome () {
        return test.step (`Ушел Домой`, async (step) => {
            await this.homeLink.click();
        })
    }

    async goTest () {
        let username = faker.internet.username();
        let password = 'pwd';

        await this.fillName(username);
        await this.fillPass(password);

        await this.tapOnLogIn();
        await this.checkSuccess(username);

        await this.goHome();
    }

}