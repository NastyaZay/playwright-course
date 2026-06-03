import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('отображение пагинации при условии, что статей 3 и больше', async ({ page }) => {
  const homePage = new HomePage(page);

  // открываем страницу
  await homePage.open();

  // ждём, что страница загрузилась
  await expect(homePage.articles.first()).toBeVisible();

  // считаем количество статей
  const articleCount = await homePage.articles.count();

  // если статей 3 и больше — пагинация должна отображаться
  if (articleCount >= 3) {
    await expect(homePage.pagination()).toBeVisible();
  } else {
    await expect(homePage.pagination()).toHaveCount(0);
  }
});