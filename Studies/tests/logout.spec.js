import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test("Разлогиниться", async ({ page }) => {
  const homePage = new HomePage(page);

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

  // открываем меню пользователя
  await homePage.openUserMenu();

  // нажимаем Logout
  await homePage.logout();

  // проверяем, что пользователь разлогинился
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
});
