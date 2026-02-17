import { expect, test } from "@playwright/test"

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
        return test.step (`Нажал кнопку Start`, async () => {
            await this.startBtn.click();
        })
    }

    clickStopBtn () {
        return test.step (`Нажал кнопку Stop`, async () => {
            await this.stopBtn.click();
        })
    }

    async goHome () {
        return test.step (`Ушел Домой`, async () => {
            await this.homeLink.click();
        })
    } 

    async checkResult () {
        return test.step (`Смотрю результат`, async () => {
            const finish = await this.resultContent.textContent();
            // ищу числа после "Result:"
            const resultMatch = finish.match(/Result:\s*([\d.]+)/);
            // ищу числа после "duration:"
            const durationMatch = finish.match(/duration:\s*([\d.]+)/);

            const result = resultMatch ? parseFloat(resultMatch[1]) : null;
            const duration = durationMatch ? parseFloat(durationMatch[1]) : null;

            await expect(this.resultContent).toHaveText(`Result: ${result}, duration: ${duration}`);
        })
    }

    async waitForProgress () {
        return test.step (`Ожидаю значения 75%`, async () => {
            let progressVal = 0;
            while (progressVal < 75) {
                const progress = await this.progressBar.innerText();
                progressVal = parseInt(progress.replace('%', ''));
            }
            //нужен синхрон из-за различной скорости progressbar
            expect (this.progressBar).toHaveText('75%');
        })
    }
}