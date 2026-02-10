import { test, expect} from '@playwright/test';

export class ProgressBarPage {
    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.startBtn = page.getByRole('button', {name: 'Start'});
        this.stopBtn = page.getByRole('button', {name: 'Stop'});

        this.progressBar = page.locator('#progressBar');
        this.resultContent = page.locator('#result');
    }

    async clickStartBtn () {
        return test.step (`Нажал на Start`, async (step) => {
            await this.startBtn.click();
        })
    }

    async clickStopBtn () {
        return test.step (`Нажал на Stop`, async (step) => {
            await this.stopBtn.click();
        })
    }

    async goHome () {
        return test.step (`Ушел Домой`, async (step) => {
            await this.homeLink.click();
        })
    }

    async checkResult () {
        return test.step (`Проверил результат`, async (step) => {
            const finish = await this.resultContent.textContent();
            // seek number after "Result:"
            const resultMatch = finish.match(/Result:\s*([\d.]+)/);
            // seek number after "duration:"
            const durationMatch = finish.match(/duration:\s*([\d.]+)/);

            const result = resultMatch ? parseFloat(resultMatch[1]) : null;
            const duration = durationMatch ? parseFloat(durationMatch[1]) : null;

            console.log({ result, duration });
            await expect(this.resultContent).toHaveText(`Result: ${result}, duration: ${duration}`);

        })
    }

    async waitForProgress () {
        return test.step (`Ожидаю значения 75%`, async (step) => {
            let progressVal = 0;
            while (progressVal < 75) {
                const progress = await this.progressBar.innerText();
                progressVal = parseInt(progress.replace('%', ''));
                await this.page.waitForTimeout(10);
                } 
        })
    }

    async goTest () {
        await this.clickStartBtn();
        await this.waitForProgress();
        await this.clickStopBtn();
        await this.checkResult();

        await this.goHome();
    }
}