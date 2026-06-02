import { test, expect } from '@playwright/test';
import { TagsPage } from '../pages/tags.page';

test('на странице отображаются 50 тегов и нужные названия', async ({ page }) => {
  const tagsPage = new TagsPage(page);

  await tagsPage.open();

  await expect(tagsPage.tags.first()).toBeVisible();
  await expect(tagsPage.tags).toHaveCount(50);

  await expect(page.getByRole('button', { name: 'реклама' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'autus' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'iste' })).toBeVisible();
});