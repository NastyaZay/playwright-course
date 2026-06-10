import { test, expect } from "@playwright/test";
import { fakerRU as faker } from "@faker-js/faker";
import { HomePage } from "../pages/home.page";
import { NewArticlePage } from "../pages/newArticle.page";
import { ArticlePage } from "../pages/article.page";

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

// функция заполнения формы статьи
async function fillArticleForm(page, article) {
  await page.getByPlaceholder("Article Title").fill(article.title);
  await page
    .getByPlaceholder("What's this article about?")
    .fill(article.description);
  await page
    .getByPlaceholder("Write your article (in markdown)")
    .fill(article.body);
  await page.getByPlaceholder("Enter tags").fill(article.tag);
}

test("Создать новую статью", async ({ page }) => {
  const homePage = new HomePage(page);
  const newArticlePage = new NewArticlePage(page);
  const articlePage = new ArticlePage(page);

  // открываем главную страницу
  await homePage.open();

  // ждём, что страница загрузилась
  await expect(homePage.articles.first()).toBeVisible();

  // нажимаем на кнопку Login
  await homePage.clickLoginButton();

  // ждём, что страница авторизации загрузилась
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  // вводим email и пароль
  await page.getByPlaceholder("Email").fill("test1234567@ya.ru");
  await page.getByPlaceholder("Password").fill("123321");

  // нажимаем на кнопку Login
  await page.getByRole("button", { name: "Login" }).click();

  // ждём, что страница после логина загрузилась
  await expect(page.getByRole("button", { name: "Your Feed" })).toBeVisible();

  // проверяем отображение логина пользователя
  await expect(page.getByText("test1234567")).toBeVisible();

  // нажимаем на кнопку New Article
  await homePage.clickNewArticle();

  // ждём, что страница создания статьи загрузилась
  await expect(page.getByPlaceholder("Article Title")).toBeVisible();

  // генерируем уникальные данные
  const article = generateArticleData();

  // заполняем форму статьи
  await fillArticleForm(page, article);

  // нажимаем на кнопку Publish Article
  await newArticlePage.clickPublishArticle();

  // ждём переход на страницу созданной статьи
  await page.waitForURL(/.*article.*/, { timeout: 10000 });

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
