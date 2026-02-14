import { test } from '@playwright/test';

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
        return test.step (`Переход на страницу ${url}`, async (step) => {
            await this.page.goto(url);
        })
    }

    async goToProgressBarTest () {
        return test.step ('Переход к тесту с загрузочной полосой', async (step) => {
            await this.progressBarLink.click();
        })
    }

    async goToTextInputTest () {
        return test.step ('Переход к тесту с вводом текста для изменения кнопки', async (step) => {
            await this.textInputLink.click();
        })
    }

    async goToSampleAppTest () {
        return test.step ('Переход к тесту с простой проверкой авторизации юзера', async (step) => {
            await this.sampleAppLink.click();
        })
    }

    async goToAlertsTest () {
        return test.step ('Переход к тесту с диалоговыми окнами', async (step) => {
            await this.alertsLink.click();
        })
    }

    async goToAnimatedBtnTest () {
        return test.step ('Переход к тесту с анимированной кнопкой', async (step) => {
            await this.animatedBtnLink.click();
        })
    }
}