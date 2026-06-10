import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page.js";
import { SettingsPage } from "../pages/settings.page.js";

const passwordUser = {
  email: "rrrrr666@ya.ru",
  password: "12345",
};

test("Изменить пароль пользователя", async ({ page }) => {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);

  // Сохраняем старый пароль, чтобы потом вернуть его обратно.
  const oldPassword = passwordUser.password;

  // Новый пароль для проверки смены пароля.
  const newPassword = "55555";

  // Открываем главную страницу приложения.
  await homePage.open();

  // Проверяем, что главная страница действительно загрузилась.
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();

  // Переходим на страницу логина.
  await homePage.clickLoginButton();

  // Убеждаемся, что форма входа открылась.
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  // Логинимся под пользователем со старым паролем.
  await page.getByPlaceholder("Email").fill(passwordUser.email);
  await page.getByPlaceholder("Password").fill(oldPassword);
  await page.getByRole("button", { name: "Login" }).click();

  // Проверяем, что авторизация прошла успешно.
  await expect(page).not.toHaveURL(/login/i);

  // Переходим в настройки аккаунта.
  await homePage.openUserMenu();
  await homePage.Settings();

  // Убеждаемся, что мы действительно на странице настроек.
  await expect(page).toHaveURL(/settings/);

  // Вводим новый пароль.
  await settingsPage.fillPassword(newPassword);

  // Сохраняем изменения.
  await settingsPage.clickUpdateSettings();

  // Ждём, пока кнопка Update исчезнет.
  await expect(settingsPage.updateSettingsButton).toBeHidden();

  // Ждём немного после сохранения настроек.
  await page.waitForTimeout(2000);

  // Разлогин.
  await homePage.openUserMenu();
  await homePage.logout();

  // После logout снова открываем страницу логина.
  await homePage.clickLoginButton();

  // Пробуем войти уже с новым паролем.
  await page.getByPlaceholder("Email").fill(passwordUser.email);
  await page.getByPlaceholder("Password").fill(newPassword);
  await page.getByRole("button", { name: "Login" }).click();

  // Проверяем, что вход с новым паролем успешен.
  await expect(page).not.toHaveURL(/login/i);

  // Снова переходим в настройки аккаунта.
  await homePage.openUserMenu();
  await homePage.Settings();

  // Убеждаемся, что мы снова на странице настроек.
  await expect(page).toHaveURL(/settings/);

  // Возвращаем старый пароль.
  await settingsPage.fillPassword(oldPassword);

  // Сохраняем настройки.
  await settingsPage.clickUpdateSettings();

  // Ждём, пока кнопка Update исчезнет.
  await expect(settingsPage.updateSettingsButton).toBeHidden();

  // Ждём немного после сохранения настроек.
  await page.waitForTimeout(2000);

  // Разлогин.
  await homePage.openUserMenu();
  await homePage.logout();

  // Снова открываем страницу логина.
  await homePage.clickLoginButton();

  // Проверяем, что вход со старым паролем снова работает.
  await page.getByPlaceholder("Email").fill(passwordUser.email);
  await page.getByPlaceholder("Password").fill(oldPassword);
  await page.getByRole("button", { name: "Login" }).click();

  // Проверяем, что восстановленный пароль работает.
  await expect(page).not.toHaveURL(/login/i);
});
