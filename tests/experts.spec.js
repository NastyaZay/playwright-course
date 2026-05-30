import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
 await page.goto('https://stage.studwork.dev/experts');
  await page.getByRole('textbox', { name: 'Все разделы' }).click();
  await page.getByText('Математические дисциплины').nth(1).click();
  await page.getByRole('button', { name: 'Найти' }).click();
  await expect(page.locator('#app')).toContainText('Найти');
});