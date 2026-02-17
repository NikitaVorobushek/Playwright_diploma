import {MainPage, ProgressBarPage, AlertPage, TextInputPage, AuthorizationPage, AnimatedPage} from './index';

export class App {
    constructor (page) {
        this.page = page;
        
        this.main = new MainPage(page);
        this.progressbar = new ProgressBarPage(page);
        this.alert = new AlertPage(page);
        this.textinp = new TextInputPage(page);
        this.authoriz = new AuthorizationPage(page);
        this.animated = new AnimatedPage(page);
    }
}