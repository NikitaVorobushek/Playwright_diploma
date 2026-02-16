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
        await this.startBtn.click();
    }

    async clickStopBtn () {
        await this.stopBtn.click();
    }

    async goHome () {
        await this.homeLink.click();
    }

    async waitForProgress () {
        let progressVal = 0;
        while (progressVal < 75) {
            const progress = await this.progressBar.innerText();
            progressVal = parseInt(progress.replace('%', ''));
            await this.page.waitForTimeout(10);
        } 
    }
}