import { test, expect } from '@playwright/test';
import { TagsPage } from '../pages/tags.page';

test('после клика по тегу показываются статьи с этим тегом', async ({ page }) => {
  const tagsPage = new TagsPage(page);
  const selectedTag = 'реклама';

  // открываем страницу
  await tagsPage.open();

  // ждём, что страница загрузилась и первый тег стал видимым
  await expect(tagsPage.tags.first()).toBeVisible();

  // кликаем по нужному тегу
  await tagsPage.clickTag(selectedTag);

  // проверяем, что появился активный таб с выбранным тегом
  await expect(tagsPage.selectedTagTab(selectedTag)).toBeVisible();

  // ждём, что первая статья стала видимой
  await expect(tagsPage.articles.first()).toBeVisible();

  // получаем количество статей
  const articleCount = await tagsPage.articles.count();
  expect(articleCount).toBeGreaterThan(0);

  // проверяем, что в каждой статье есть выбранный тег
  for (let i = 0; i < articleCount; i++) {
    const article = tagsPage.articles.nth(i);
    const articleTags = tagsPage.articleTags(article);
    const tagsWithSelected = articleTags.filter({ hasText: selectedTag });

    await expect(tagsWithSelected).toHaveCount(1);
  }
});