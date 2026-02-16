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
        await this.nameInp.fill(username);    
    }

    async fillPass (password) {
        await this.passInp.fill(password);      
    }

    async tapOnLogIn () {
        await this.logInBtn.click();     
    }

    async goHome () {
        await this.homeLink.click();
    }
}