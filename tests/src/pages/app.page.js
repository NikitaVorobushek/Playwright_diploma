import {MainPage, HomePage, ClickPage} from './index';

export class App {
    constructor(page) {
        this.page = page;
        
        this.main = new MainPage(page);
        this.home = new HomePage(page);
        this.click = new ClickPage(page);
}
}