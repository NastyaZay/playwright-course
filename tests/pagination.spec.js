import { test, expect } from '@playwright/test';
import { TagsPage } from '../pages/tags.page';

test('отображение пагинации при условии, что статей 3 и больше', async ({ page }) => {
  const tagsPage = new TagsPage(page);

  // открываем страницу
  await tagsPage.open();

  // ждём, что страница загрузилась
  await expect(tagsPage.articles.first()).toBeVisible();

  // считаем количество статей
  const articleCount = await tagsPage.articles.count();

  // если статей 3 и больше — пагинация должна отображаться
  if (articleCount >= 3) {
    await expect(tagsPage.pagination()).toBeVisible();
  } else {
    await expect(tagsPage.pagination()).toHaveCount(0);
  }
});