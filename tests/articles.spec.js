import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('при клике по статье открывается страница статьи и меняется url', async ({ page }) => {
  const homePage = new HomePage(page);

  // открываем главную страницу
  await homePage.open();

  // ждём, что первая статья появилась
  await expect(homePage.articles.first()).toBeVisible();

  // сохраняем заголовок первой статьи
  const articleTitle = await homePage.firstArticleTitle().textContent();

  // открываем первую статью
  await homePage.openFirstArticle();

  // проверяем, что url изменился и содержит article
  await expect(page).toHaveURL(/.*article.*/);

  // проверяем, что заголовок статьи отображается на странице
  await expect(
    page.getByRole('heading', { name: articleTitle?.trim() })
  ).toBeVisible();
});