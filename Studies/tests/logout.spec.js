import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page.js";

test("Разлогиниться", async ({ page }) => {
  const homePage = new HomePage(page);

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

  // открываем меню пользователя
  await homePage.openUserMenu();

  // нажимаем Logout
  await homePage.logout();

  // проверяем, что пользователь разлогинился
  await expect(homePage.loginButton).toBeVisible();
});
