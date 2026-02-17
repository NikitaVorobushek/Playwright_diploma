import { expect, test } from "@playwright/test"

export class AnimatedPage {

    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.startAnimBtn = page.getByRole('button', {name: 'Start Animation'});
        this.movingTargetBtn = page.getByRole('button', {name: 'Moving Target'});

        this.opStatus = page.locator('#opstatus');
    }

    async clickStartAnimation () {
        return test.step (`Нажал кнопку Start Animation`, async () => {
            await this.startAnimBtn.click();
        })
    }

    async clickMovingTarget () {
        return test.step (`Нажал кнопку Moving Target`, async () => {
            await this.movingTargetBtn.click();
        })   
    }

    async goHome () {
        return test.step (`Ушел Домой`, async () => {
            await this.homeLink.click();
        })
    } 

    async checkAnimationStatus () {
        return test.step (`Проверил статус анимации`, async () => {
            await expect(this.opStatus).toHaveText('Animation done');
        })
    }
}