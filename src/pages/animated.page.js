import { expect, test } from "@playwright/test"

export class AnimatedPage {

    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.startAnimBtn = page.getByRole('button', {name: 'Start Animation'});
        this.movingTargetBtn = page.getByRole('button', {name: 'Moving Target'});

        this.opStatus = page.locator('#opstatus');
    }

    async runAnimationAndClickTarget () {
        return test.step ('Запуск теста и ожидание окончания анимации', async () => {
            await this.startAnimBtn.click();
            await expect(this.opStatus).toHaveText('Animation done');
            await this.movingTargetBtn.click();
        }    
    }
    
    async goHome () {
        return test.step (`Ушел Домой`, async () => {
            await this.homeLink.click();
        })
    } 
}
