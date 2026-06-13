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

  const oldPassword = passwordUser.password;
  const newPassword = "Test55555";

  // открываем главную страницу приложения
  await homePage.open();

  // проверяем, что главная страница загрузилась
  await expect(homePage.loginButton).toBeVisible();

  // переходим на страницу логина
  await homePage.clickLoginButton();

  // убеждаемся, что форма входа открылась
  await expect(homePage.signInHeading).toBeVisible();

  // логинимся под пользователем со старым паролем
  await homePage.login(passwordUser.email, oldPassword);

  // проверяем успешный вход
  await expect(homePage.yourFeedButton).toBeVisible();

  // переходим в настройки аккаунта
  await homePage.openUserMenu();
  await homePage.openSettings();

  // убеждаемся, что открылась страница настроек
  await expect(page).toHaveURL(/settings/);

  // вводим новый пароль
  await settingsPage.fillPassword(newPassword);

  // проверяем, что кнопка сохранения доступна
  await expect(settingsPage.getUpdateSettingsButton()).toBeVisible();

  // сохраняем изменения
  await settingsPage.clickUpdateSettings();

  // ждём завершения обновления
  await expect(settingsPage.getUpdateSettingsButton()).toBeHidden();

  // разлогиниваемся
  await homePage.openUserMenu();
  await homePage.logout();

  // убеждаемся, что снова видим кнопку Login
  await expect(homePage.loginButton).toBeVisible();

  // снова открываем страницу логина
  await homePage.clickLoginButton();
  await expect(homePage.signInHeading).toBeVisible();

  // входим с новым паролем
  await homePage.login(passwordUser.email, newPassword);

  // проверяем, что вход с новым паролем успешен
  await expect(homePage.yourFeedButton).toBeVisible();

  // снова переходим в настройки
  await homePage.openUserMenu();
  await homePage.openSettings();

  // убеждаемся, что мы снова на странице настроек
  await expect(page).toHaveURL(/settings/);

  // возвращаем старый пароль
  await settingsPage.fillPassword(oldPassword);

  // проверяем, что кнопка сохранения доступна
  await expect(settingsPage.getUpdateSettingsButton()).toBeVisible();

  // сохраняем изменения
  await settingsPage.clickUpdateSettings();

  // ждём завершения обновления
  await expect(settingsPage.getUpdateSettingsButton()).toBeHidden();

  // разлогиниваемся
  await homePage.openUserMenu();
  await homePage.logout();

  // убеждаемся, что снова видим кнопку Login
  await expect(homePage.loginButton).toBeVisible();

  // снова открываем страницу логина
  await homePage.clickLoginButton();
  await expect(homePage.signInHeading).toBeVisible();

  // проверяем, что старый пароль снова работает
  await homePage.login(passwordUser.email, oldPassword);

  // проверяем успешный вход
  await expect(homePage.yourFeedButton).toBeVisible();
});
