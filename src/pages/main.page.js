import { test } from "@playwright/test";

export class MainPage {

    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.progressBarLink = page.getByRole('link', {name: 'Progress Bar'});
        this.textInputLink = page.getByRole('link', {name: 'Text Input'});
        this.sampleAppLink = page.getByRole('link', {name: 'Sample App'});
        this.alertsLink = page.getByRole('link', {name: 'Alerts'});
        this.animatedBtnLink = page.getByRole('link', {name: 'Animated Button'});
    }

    async open () {
        return test.step(`Перешел на главную страницу`, async () => {
            await this.page.goto('');    
        })
    }

    async goToProgressBarTest () {
        return test.step(`Перешел в Progress Bar Test`, async () => {
            await this.progressBarLink.click();   
        })
    }

    async goToTextInputTest () {
        return test.step(`Перешел в Text Input Test`, async () => {
            await this.textInputLink.click();  
        })
    }

    async goToSampleAppTest () {
        return test.step(`Перешел в Sample App Test`, async () => {
            await this.sampleAppLink.click(); 
        })
    }

    async goToAlertsTest () {
        return test.step(`Перешел в Alerts Test`, async () => {
            await this.alertsLink.click();  
        })
    }

    async goToAnimatedBtnTest () {
        return test.step(`Перешел в Animated Button Test`, async () => {
            await this.animatedBtnLink.click();
        })
    }
}
