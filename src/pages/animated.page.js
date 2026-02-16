export class AnimatedPage {

    constructor (page) {
        this.page = page;

        this.homeLink = page.getByRole('link', {name: 'Home'});

        this.startAnimBtn = page.getByRole('button', {name: 'Start Animation'});
        this.movingTargetBtn = page.getByRole('button', {name: 'Moving Target'});

        this.opStatus = page.locator('#opstatus');
    }

    async clickStartAnimation () {
        await this.startAnimBtn.click();    
    }

    async clickMovingTarget () {
        await this.movingTargetBtn.click();    
    }

    async goHome () {
        await this.homeLink.click();
    } 

    async checkAnimationStatus () {
        let curStatus;
        do {
            curStatus = await this.opStatus.innerText();
            await new Promise(resolve =>
                setTimeout(resolve, 100));
            } 
        while (curStatus === 'Animating the button...' || curStatus === '---');
    }
}