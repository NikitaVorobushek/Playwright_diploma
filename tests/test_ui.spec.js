import { test, expect} from '@playwright/test';
import { App } from './src/pages/app.page';


const url1 = 'http://uitestingplayground.com/' // UI tests url

test('Click element test', async ({ page }) => {
  const app = new App(page);
  let btnColor;

  await app.main.open(url1);
  await app.home.goToClickTest();
  await app.click.clickButtonTest();

  
  await page.getByRole('button', { name: 'Button That Ignores DOM Click' }).click();
  await expect(page.getByRole('button', { name: 'Button That Ignores DOM Click' })).toBeVisible();
});