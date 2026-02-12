import { test, expect} from '@playwright/test';
import { App } from './src/pages/app.page';

const url = 'http://uitestingplayground.com/' // UI tests url

test.describe('UI Tests', () =>{

  test('Alert test', async ({ page }) => {
    const app = new App(page);
    await app.main.open(url);

    await app.main.goToAlertsTest();
    await app.alert.goTest();
  });

  test('Text input test', async ({ page }) => {
    const app = new App(page);
    await app.main.open(url);

    await app.main.goToTextInputTest();
    await app.texinp.goTest();
  })

  test('Simple autorization test', async ({ page }) => {
    const app = new App(page);
    await app.main.open(url);

    await app.main.goToSampleAppTest();
    await app.autoriz.goTest();
  })

  test('Animated Button test', async ({ page }) => {
    const app = new App(page);
    await app.main.open(url);

    await app.main.goToAnimatedBtnTest();
    await app.animated.goTest();
  })

  test('Progress Bar test', async ({ page }) => {
    const app = new App(page);
    await app.main.open(url);

    await app.main.goToProgressBarTest();
    await app.progressbar.goTest();
  });
})