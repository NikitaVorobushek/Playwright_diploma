import { test, expect } from '@playwright/test';

export class AnimatedPage {

    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.startAnimBtn = page.getByRole('button', {name: 'Start Animation'});
        this.movingTargetBtn = page.getByRole('button', {name: 'Moving Target'});

        this.opStatus = page.locator('#opstatus');
    }

    async clickStartAnimation () {
        return test.step (`Нажал кнопку Start Animation`, async (step) => {
            await this.startAnimBtn.click();
        })        
    }

    async clickMovingTarget () {
        return test.step (`Нажал кнопку Moving Target`, async (step) => {
            await this.movingTargetBtn.click();
        })        
    }

    async getStatusOfAnimation () {
        return test.step (`Проверил совпадение`, async (step) => {
            await expect(this.opStatus).toHaveText("Moving Target clicked. It's class name is 'btn btn-primary'");
        })        
    }

    async goHome () {
        return test.step (`Ушел Домой`, async (step) => {
            await this.homeLink.click();
        })
    } 

    async checkAnimationStatus () {
        return test.step (`Проверил статус анимации`, async (step) => {
            let curStatus;
            do {
                curStatus = await this.opStatus.innerText();
                await new Promise(resolve =>
                    setTimeout(resolve, 100));
                } 
            while (curStatus === 'Animating the button...' || curStatus === '---');
        })  
    }

    async goTest () {
        await this.clickStartAnimation();

        await this.checkAnimationStatus();
        await this.clickMovingTarget();

        await this.getStatusOfAnimation();
        await this.goHome();
    }
}