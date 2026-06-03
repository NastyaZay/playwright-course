import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('на странице отображаются 50 тегов и нужные названия', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();

  await expect(homePage.tags.first()).toBeVisible();
  await expect(homePage.tags).toHaveCount(50);

  await expect(homePage.page.getByRole('button', { name: 'реклама' })).toBeVisible();
  await expect(homePage.page.getByRole('button', { name: 'autus' })).toBeVisible();
  await expect(homePage.page.getByRole('button', { name: 'iste' })).toBeVisible();
});