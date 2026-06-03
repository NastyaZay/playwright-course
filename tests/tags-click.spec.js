import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('после клика по тегу показываются статьи с этим тегом', async ({ page }) => {
  const homePage = new HomePage(page);
  const selectedTag = 'реклама';

  // открываем страницу
  await homePage.open();

  // ждём, что страница загрузилась и первый тег стал видимым
  await expect(homePage.tags.first()).toBeVisible();

  // кликаем по нужному тегу
  await homePage.clickTag(selectedTag);

  // проверяем, что появился активный таб с выбранным тегом
  await expect(homePage.selectedTagTab(selectedTag)).toBeVisible();

  // ждём, что первая статья стала видимой
  await expect(homePage.articles.first()).toBeVisible();

  // получаем количество статей
  const articleCount = await homePage.articles.count();
  expect(articleCount).toBeGreaterThan(0);

  // проверяем, что в каждой статье есть выбранный тег
  for (let i = 0; i < articleCount; i++) {
    const article = homePage.articles.nth(i);
    const articleTags = homePage.articleTags(article);
    const tagsWithSelected = articleTags.filter({ hasText: selectedTag });

    await expect(tagsWithSelected).toHaveCount(1);
  }
});