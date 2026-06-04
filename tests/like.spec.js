import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Проверка лайка на статье', async ({ page }) => {
  const homePage = new HomePage(page);

  //ПРЕДУСЛОВИЯ
  // открываем страницу
  await homePage.open();

  // ждём, что страница загрузилась
  await expect(homePage.articles.first()).toBeVisible();

  // нажимаем на кнопку Login
  await homePage.clickLoginButton();

  // ждём, что страница авторизации загрузилась
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();

  // вводим email и пароль
  await page.getByPlaceholder('Email').fill('test123456@ya.ru');
  await page.getByPlaceholder('Password').fill('123456');

  // нажимаем на кнопку Login
  await page.getByRole('button', { name: 'Login' }).click();

  // ждём, что страница после логина загрузилась
  await expect(page.getByText('test123')).toBeVisible();

  // проверяем отображение логина пользователя
  await expect(page.getByText('test123')).toBeVisible();

  // ШАГИ
  // кликаем по табу "Global Feed"
  await homePage.clickGlobalFeedTab();

  // ждём, что лента загрузилась
  await expect(homePage.articles.first()).toBeVisible();

  // сохраняем текущее количество лайков
  const initialLikesText = await homePage.likeCount().textContent();

  // оставляем только цифры и превращаем строку в число
  const initialLikesCount = Number((initialLikesText || '').replace(/\D/g, ''));

  // нажимаем на кнопку лайка первой статьи в ленте
  await homePage.clickLikeButton();

  // проверяем, что количество лайков увеличилось на единицу
  await expect(homePage.likeCount()).toContainText(String(initialLikesCount + 1));
});
