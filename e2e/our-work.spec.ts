import { expect, test } from './fixture';

test.describe('Our Work page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/our-work');
    await page.waitForFunction(() => {
      const article = document.querySelector('article');
      return !!article && Object.keys(article).some(k => k.startsWith('__reactFiber'));
    });
  });

  test('loads and shows the Our Work heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Our Work', level: 1 })).toBeVisible();
  });

  test('renders at least one project card with a name', async ({ page }) => {
    const projectNames = page.locator('h3');
    await expect(projectNames.first()).toBeVisible();
  });

  test('external project links open in a new tab', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    if (count > 0) {
      await expect(externalLinks.first()).toHaveAttribute('rel', /noopener/);
    }
  });

  test('shows BackToHome and SocialLinks components', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Let's Go/i })).toBeVisible();
    await expect(page.getByLabel('LinkedIn').first()).toBeVisible();
  });
});
