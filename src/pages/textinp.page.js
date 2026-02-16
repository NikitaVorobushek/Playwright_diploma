export class TextInputPage {
    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.updBtn = page.locator('#updatingButton');
        
        this.inpText = page.getByRole('textbox', {name: 'Set New Button Name'});
    }
    
    async clickUpdatingBtn () {
        await this.updBtn.click();     
    }

    async fillInInputField (newBtnName) {
        await this.inpText.fill(newBtnName);      
    }

    async goHome () {
        await this.homeLink.click();
    }
}