import { test, expect } from '@playwright/test';
//import { faker } from '@faker-js/faker';

const URL = "https://realworld.qa.guru/";
let userName = "Nastya2805";
let email = "Nastya2805@yandex.ru'";
let password = "123456";
test('test', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(userName);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText(userName);
});
