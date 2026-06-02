import { test, expect } from '@playwright/test';
import { TagsPage } from '../pages/tags.page';

test('при клике по статье открывается страница статьи и меняется url', async ({ page }) => {
  const tagsPage = new TagsPage(page);

  // открываем главную страницу
  await tagsPage.open();

  // ждём, что первая статья появилась
  await expect(tagsPage.articles.first()).toBeVisible();

  // сохраняем заголовок первой статьи
  const articleTitle = await tagsPage.firstArticleTitle().textContent();

  // открываем первую статью
  await tagsPage.openFirstArticle();

  // проверяем, что url изменился и содержит article
  await expect(page).toHaveURL(/.*article.*/);

  // проверяем, что заголовок статьи отображается на странице
  await expect(
    page.getByRole('heading', { name: articleTitle?.trim() })
  ).toBeVisible();
});