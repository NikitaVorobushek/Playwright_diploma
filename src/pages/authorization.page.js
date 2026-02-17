import { test } from "@playwright/test";

export class AuthorizationPage {

    constructor(page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.nameInp = page.getByRole('textbox', {name: 'User Name'});
        this.passInp = page.getByRole('textbox', {name: '********'});

        this.logInBtn = page.getByRole('button', {name: 'Log in'});
        
        this.status = page.locator('#loginstatus');
    }

    async makeLogin (name, pass) {
        return test.step('Ввел Имя/Пароль и нажал Login', async () => {
            await this.nameInp.fill(name);
            await this.passInp.fill(pass);

            await this.logInBtn.click();
        })
    }

    async goHome () {
        return test.step('Ушел Домой', async () => {
            await this.homeLink.click();    
        })
    }
}