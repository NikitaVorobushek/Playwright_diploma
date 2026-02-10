import {MainPage, ProgressBarPage, AlertPage, TextInputPage, AutorizationPage, AnimatedPage} from './index';

export class App {
    constructor (page) {
        this.page = page;
        
        this.main = new MainPage(page);
        this.progressbar = new ProgressBarPage(page);
        this.alert = new AlertPage(page);
        this.texinp = new TextInputPage(page);
        this.autoriz = new AutorizationPage(page);
        this.animated = new AnimatedPage(page);
    }
}