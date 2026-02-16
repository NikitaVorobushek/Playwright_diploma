export class MainPage {

    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'}).describe('Home button');

        this.progressBarLink = page.getByRole('link', {name: 'Progress Bar'}).describe('Progress Bar test button');
        this.textInputLink = page.getByRole('link', {name: 'Text Input'}).describe('Text input test button');
        this.sampleAppLink = page.getByRole('link', {name: 'Sample App'}).describe('Sample App test button');
        this.alertsLink = page.getByRole('link', {name: 'Alerts'}).describe('Alerts test button');
        this.animatedBtnLink = page.getByRole('link', {name: 'Animated Button'}).describe('Animated Button test button');
    }

    async open (url) {
        await this.page.goto(url);
    }

    async goToProgressBarTest () {
        await this.progressBarLink.click();
    }

    async goToTextInputTest () {
        await this.textInputLink.click();
    }

    async goToSampleAppTest () {
        await this.sampleAppLink.click();
    }

    async goToAlertsTest () {
        await this.alertsLink.click();
    }

    async goToAnimatedBtnTest () {
        await this.animatedBtnLink.click();
    }
}