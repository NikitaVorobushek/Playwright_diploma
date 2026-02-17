import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';
import { UserBuilder } from '../src/helpers/builders/index';
import 'dotenv/config';

test.describe('UI Tests', () =>{

  test('Alert test', async ({ app }) => {

    await app.main.open();

    await app.main.goToAlertsTest();

    const dayToday = await app.alert.getServerDayNumber();
    await app.alert.tryDialog(dayToday);

    await app.alert.clickAlertBtn();
    await app.alert.clickConfirmBtn();
    await app.alert.clickPromptBtn();

    await app.alert.goHome();
  });

  test('Text input test', async ({ app }) => {
    
    await app.main.open();
    await app.main.goToTextInputTest();

    const newBtnName = new UserBuilder().withInputName().build();

    await app.textinp.updButtonName(newBtnName.name);
    await expect(app.textinp.updBtn).toContainText(newBtnName.name);  
    
    await app.textinp.goHome();
  })

  test('Simple authorization test', async ({ app }) => {
    
    await app.main.open();

    await app.main.goToSampleAppTest();

    const user = new UserBuilder().withInputName().withPassword().build();
    await app.authoriz.makeLogin(user.name, user.password);
    await expect(app.authoriz.status).toContainText(`Invalid username/password`);

    await app.authoriz.goHome();
  })

  test('Animated Button test', async ({ app }) => {
    
    await app.main.open();

    await app.main.goToAnimatedBtnTest();

    await app.animated.clickStartAnimation();
    await app.animated.checkAnimationStatus();
    await app.animated.clickMovingTarget();
    
    await expect(app.animated.opStatus).toHaveText("Moving Target clicked. It's class name is 'btn btn-primary'");

    await app.animated.goHome();
  })

  test('Progress Bar test', async ({ app }) => {
    
    await app.main.open();

    await app.main.goToProgressBarTest();

    await app.progressbar.clickStartBtn();
    await app.progressbar.waitForProgress();
    await app.progressbar.clickStopBtn();
    await app.progressbar.checkResult();

    await app.progressbar.goHome();
  });
})