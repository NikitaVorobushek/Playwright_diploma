import { test, expect} from '@playwright/test';

export class HomePage {

    constructor(page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'}).describe('Home button');
        
        this.clickLink = page.getByRole('link', {name: 'Click'}).describe('Click test button');
        this.textInputLink = page.getByRole('link', {name: 'Text Input'}).describe('Text input test button');
        this.sampleAppLink = page.getByRole('link', {name: 'Sample App'}).describe('Sample App test button');
        this.alertsLink = page.getByRole('link', {name: 'Alerts'}).describe('Alerts test button');
        this.animatedBtnLink = page.getByRole('link', {name: 'Animated Button'}).describe('Animated Button test button');
    }

    async goToClickTest() {
        await this.clickLink.click();
    }

    async goToTextInputTest() {
        await this.textInputLink.click();
    }

    async goToSampleAppTest() {
        await this.sampleAppLink.click();
    }

    async goToAlertsTest() {
        await this.alertsLink.click();
    }

    async goToAnimatedBtnTest() {
        await this.animatedBtnLink.click();
    }
}