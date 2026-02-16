import { test, expect} from '@playwright/test';
import { faker } from "@faker-js/faker";
import { App } from '../src/pages/app.page';

const url = 'http://uitestingplayground.com/' // UI tests url

test.describe('UI Tests', () =>{

  test('Alert test', async ({ page }) => {
    const app = new App(page);
    await test.step (`Переход на страницу http://uitestingplayground.com/`, async () => {
      await app.main.open(url);
    })

    await test.step (`Переход на страницу Alert test`, async () => {
      await app.main.goToAlertsTest();
    })

    await test.step (`Вычислил день недели, тип и сообщение диалогового окна`, async () => {
      const dayToday = await app.alert.getServerDayNumber();
      await app.alert.tryDialog(dayToday);
    })
    await test.step (`Нажали кнопку Alert`, async () => {
      await app.alert.clickAlertBtn();
    })
    await test.step (`Нажали кнопку Confirm`, async () => {
      await app.alert.clickConfirmBtn();
    })
    await test.step (`Нажали кнопку Promt`, async () => {
      await app.alert.clickPromptBtn();
    })
    await test.step (`Ушел домой`, async () => {
      await app.alert.goHome();
    })
  });

  test('Text input test', async ({ page }) => {
    const app = new App(page);
    await test.step (`Переход на страницу http://uitestingplayground.com/`, async () => {
      await app.main.open(url);
    })

    await test.step (`Переход на страницу Text Input test`, async () => {
      await app.main.goToTextInputTest();
    })

    let newBtnName = faker.internet.username();

    await test.step (`Заполнил поле текстом`, async () => {
      await app.texinp.fillInInputField(newBtnName);
    })    
    await test.step (`Нажал кнопку Updating Button`, async () => {
      await app.texinp.clickUpdatingBtn();
    })
    await test.step (`Сверил значения`, async () => {
      await expect(app.texinp.updBtn).toContainText(newBtnName);  
    })  
    await test.step (`Ушел домой`, async () => {
      await app.texinp.goHome();
    })
  })

  test('Simple autorization test', async ({ page }) => {
    const app = new App(page);
    await test.step (`Переход на страницу http://uitestingplayground.com/`, async () => {
      await app.main.open(url);
    })

    await test.step (`Переход на страницу Sample App test`, async () => {
      await app.main.goToSampleAppTest();
    })

    let username = faker.internet.username();
    let password = 'pwd';

    await test.step (`Заполнил Имя`, async () => {
      await app.autoriz.fillName(username);
    }) 
    await test.step (`Заполнил Пароль`, async () => {
      await app.autoriz.fillPass(password);
    }) 
    await test.step (`Нажал на кнопку Log In`, async () => {
      await app.autoriz.tapOnLogIn();
    }) 
    await test.step (`Проверил успешность "авторизации"`, async () => {
      await expect(app.autoriz.status).toContainText(`Welcome, ${username}!`);
    })
    await test.step (`Ушел домой`, async () => {
      await app.autoriz.goHome();
    })
  })

  test('Animated Button test', async ({ page }) => {
    const app = new App(page);
    await test.step (`Переход на страницу http://uitestingplayground.com/`, async () => {
      await app.main.open(url);
    })

    await test.step (`Переход на страницу Animated Button test`, async () => {
      await app.main.goToAnimatedBtnTest();
    })
    await test.step (`Нажал кнопку Start Animation`, async () => {
      await app.animated.clickStartAnimation();
    })
    await test.step (`Проверил статус анимации`, async () => {
      await app.animated.checkAnimationStatus();
    })
    await test.step (`Нажал кнопку Moving Target`, async () => {
      await app.animated.clickMovingTarget();
    })
    await test.step (`Проверил совпадение`, async () => {
      await expect(app.animated.opStatus).toHaveText("Moving Target clicked. It's class name is 'btn btn-primary'");
    })  
    await test.step (`Ушел домой`, async () => {
      await app.animated.goHome();
    })
  })

  test('Progress Bar test', async ({ page }) => {
    const app = new App(page);
    await test.step (`Переход на страницу http://uitestingplayground.com/`, async () => {
      await app.main.open(url);
    })

    await test.step (`Переход на страницу Progress Bar test`, async () => {
      await app.main.goToProgressBarTest();
    })
    await test.step (`Нажал на Start`, async () => {
      await app.progressbar.clickStartBtn();
    })
    await test.step (`Ожидаю значения 75%`, async () => {
      await app.progressbar.waitForProgress();
    })
    await test.step (`Нажал на Stop`, async () => {
      await app.progressbar.clickStopBtn();
    })
    await test.step (`Проверил результат`, async () => {
      const finish = await app.progressbar.resultContent.textContent();
      // ищу числа после "Result:"
      const resultMatch = finish.match(/Result:\s*([\d.]+)/);
      // ищу числа после "duration:"
      const durationMatch = finish.match(/duration:\s*([\d.]+)/);

      const result = resultMatch ? parseFloat(resultMatch[1]) : null;
      const duration = durationMatch ? parseFloat(durationMatch[1]) : null;

      await expect(app.progressbar.resultContent).toHaveText(`Result: ${result}, duration: ${duration}`);
    })

    await test.step (`Ушел домой`, async () => {
      await app.progressbar.goHome();
    })
  });
})