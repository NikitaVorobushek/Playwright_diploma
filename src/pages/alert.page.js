import { test } from "@playwright/test";

export class AlertPage {
    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.alertBtn = page.getByRole('button', {name: 'Alert'});
        this.confirmBtn = page.getByRole('button', {name: 'Confirm'});
        this.promptBtn = page.getByRole('button', {name: 'Prompt'});
    }

    async clickAlertBtn () {
        return test.step (`Нажали кнопку Alert`, async () => {
            await this.alertBtn.click();
        })
    }

    async clickConfirmBtn () {
        return test.step (`Нажали кнопку Confirm`, async () => {
            await this.confirmBtn.click();
        })
    }

    async clickPromptBtn () {
        return test.step (`Нажали кнопку Prompt`, async () => {
            await this.promptBtn.click();
        })
    }
    
    async goHome () {
        return test.step (`Ушел Домой`, async () => {
            await this.homeLink.click();
        })
    } 

    async getServerDayNumber () {
        return test.step (`Вычислил день недели`, async () => {
            const currentDate = new Date();
            // 0 - Sunday, 6 - Saturday
            // 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
            const dayOfWeekNumber = currentDate.getDay();
	        return dayOfWeekNumber;
        })
    }

    async tryDialog (dayToday) {
        return test.step (`Вычислил тип и сообщение диалогового окна`, async () => {
            await this.page.on('dialog', async dialog => {
            let typ = dialog.type();
            let mes = dialog.message();

            switch (typ) {
                case 'alert':
                    await dialog.accept();
                    break;
                case 'confirm': 
                    // today is friday and have message dialog
                    if (mes.includes('Friday') && dayToday == 5) {
                        await dialog.accept();
                        await dialog.message('Yes');
                    }
                    // today is not friday and have message dialog
                    else if ((mes.includes('Friday') && dayToday != 5)) {
                        await dialog.dismiss();
                        await dialog.message('No');
                    }
                    // final dialog result
                    else if (mes.includes('User value: cats&dogs')) {
                        await dialog.accept();
                        break;
                    }
                    // else go out (just in case of apocalypse)
                    break;
                case 'prompt':
                    await dialog.accept('cats&dogs');
                    break;
                }
            })
        })
    }
}