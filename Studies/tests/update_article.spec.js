import { test, expect } from "@playwright/test";
import { fakerRU as faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page.js";
import { NewArticlePage } from "../pages/newarticle.page.js";
import { ArticlePage } from "../pages/article.page.js";

// функция генерации тестовых данных статьи
function generateArticleData() {
  const uniqueId = Date.now();

  return {
    title: `${faker.lorem.sentence(3)} ${uniqueId}`,
    description: faker.lorem.sentence(6),
    body: faker.lorem.paragraphs(2, "\n\n"),
    tag: `${faker.lorem.word()}-${uniqueId}`,
  };
}

test("Изменить статью", async ({ page }) => {
  const homePage = new HomePage(page);
  const newArticlePage = new NewArticlePage(page);
  const articlePage = new ArticlePage(page);

  // генерируем данные для статьи
  const article = generateArticleData();

  // генерируем новое название статьи
  const updatedTitle = `${faker.lorem.sentence(3)} ${Date.now()}`;

  // открываем главную страницу
  await homePage.open();

  // проверяем, что статьи отображаются
  await expect(homePage.firstArticle).toBeVisible();

  // переходим на страницу логина
  await homePage.clickLoginButton();

  // проверяем, что открылась страница авторизации
  await expect(homePage.signInHeading).toBeVisible();

  // логинимся
  await homePage.login("test1234567@ya.ru", "123321");

  // проверяем, что логин прошёл успешно
  await expect(homePage.yourFeedButton).toBeVisible();
  await expect(homePage.getUserName("test1234567")).toBeVisible();

  // открываем страницу создания статьи
  await homePage.clickNewArticle();

  // проверяем, что форма статьи открылась
  await expect(newArticlePage.articleTitleInput).toBeVisible();

  // заполняем форму статьи
  await newArticlePage.fillArticleForm(article);

  // публикуем статью
  await newArticlePage.clickPublishArticle();

  // проверяем переход на страницу статьи
  await expect(page).toHaveURL(/.*article.*/);

  // проверяем заголовок статьи
  await expect(articlePage.articleTitle).toHaveText(article.title);

  // проверяем текст статьи
  const expectedParagraphs = article.body.split("\n\n");
  await expect(articlePage.articleText).toContainText(expectedParagraphs);

  // проверяем тег статьи
  await expect(articlePage.articleTags).toContainText([article.tag]);

  // нажимаем на кнопку редактирования статьи
  await articlePage.clickEditArticle();

  // проверяем, что открылась страница редактирования
  await expect(page).toHaveURL(/.*editor.*/);
  await expect(newArticlePage.articleTitleInput).toBeVisible();

  // меняем название статьи
  await newArticlePage.fillArticleTitle(updatedTitle);

  // сохраняем изменения
  await newArticlePage.clickUpdateArticleButton();

  // проверяем переход обратно на страницу статьи
  await expect(page).toHaveURL(/.*article.*/);

  // проверяем, что заголовок обновился
  await expect(articlePage.articleTitle).toHaveText(updatedTitle);

  // проверяем, что текст статьи остался прежним
  await expect(articlePage.articleText).toContainText(expectedParagraphs);

  // проверяем, что тег статьи остался прежним
  await expect(articlePage.articleTags).toContainText([article.tag]);
});
