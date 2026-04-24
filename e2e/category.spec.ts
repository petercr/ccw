import { expect, test } from './fixture';

const CATEGORY_SLUG = 'design';

test.describe('Category page (dynamic)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/${CATEGORY_SLUG}`);
    await page.waitForFunction(() => {
      const article = document.querySelector('article');
      return !!article && Object.keys(article).some(k => k.startsWith('__reactFiber'));
    });
  });

  test('renders the category title as an h1', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Design', level: 1 })).toBeVisible();
  });

  test('category description/body text is visible', async ({ page }) => {
    await expect(page.getByText(/It all starts with a great look/i)).toBeVisible();
  });

  test('shows Topics section when SEO keywords are present', async ({ page }) => {
    const topics = page.getByRole('heading', { name: 'Topics' });
    const count = await topics.count();
    if (count > 0) {
      await expect(topics).toBeVisible();
      await expect(page.getByRole('listitem').first()).toBeVisible();
    }
  });

  test('shows BackToHome and SocialLinks components', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Let's Go/i })).toBeVisible();
    await expect(page.getByLabel('LinkedIn').first()).toBeVisible();
  });

  test('404 — navigating to a non-existent slug shows the NotFound page', async ({ page }) => {
    await page.goto('/definitely-does-not-exist-category-xyz-404');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByText(/could not be found/i)).toBeVisible();
  });
});
