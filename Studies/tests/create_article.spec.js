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

test("Создать новую статью", async ({ page }) => {
  const homePage = new HomePage(page);
  const newArticlePage = new NewArticlePage(page);
  const articlePage = new ArticlePage(page);

  // открываем главную страницу
  await homePage.open();

  // ждём, что страница загрузилась
  await expect(homePage.firstArticle).toBeVisible();

  // нажимаем на кнопку Login
  await homePage.clickLoginButton();

  // ждём, что страница авторизации загрузилась
  await expect(homePage.signInHeading).toBeVisible();

  // вводим email и пароль
  await homePage.login("test1234567@ya.ru", "123321");

  // ждём, что страница после логина загрузилась
  await expect(homePage.yourFeedButton).toBeVisible();

  // проверяем отображение логина пользователя
  await expect(homePage.getUserName("test1234567")).toBeVisible();

  // нажимаем на кнопку New Article
  await homePage.clickNewArticle();

  // ждём, что страница создания статьи загрузилась
  await expect(newArticlePage.articleTitleInput).toBeVisible();

  // генерируем уникальные данные
  const article = generateArticleData();

  // заполняем форму статьи
  await newArticlePage.fillArticleForm(article);

  // нажимаем на кнопку Publish Article
  await newArticlePage.clickPublishArticle();

  // проверяем изменение url - переход на страницу созданной статьи
  await expect(page).toHaveURL(/.*article.*/);

  // проверяем заголовок статьи
  await expect(articlePage.articleTitle).toHaveText(article.title);

  // проверяем текст статьи
  const expectedParagraphs = article.body.split("\n\n");
  await expect(articlePage.articleText).toContainText(expectedParagraphs);

  // проверяем теги
  await expect(articlePage.articleTags).toContainText([article.tag]);
});
