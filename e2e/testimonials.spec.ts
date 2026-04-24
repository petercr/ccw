import { expect, test } from './fixture';

test.describe('Testimonials page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/testimonials');
    await page.waitForFunction(() => {
      const article = document.querySelector('article');
      return !!article && Object.keys(article).some(k => k.startsWith('__reactFiber'));
    });
  });

  test('loads and shows the Testimonials heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Testimonials', level: 1 })).toBeVisible();
  });

  test('renders at least one testimonial card with name and body text', async ({ page }) => {
    // h2 holds the testimonial name; each card also has a <p> for the body
    const names = page.locator('h2');
    await expect(names.first()).toBeVisible();
    const bodies = page.locator('p').filter({ hasNotText: /Back To Home|Social Links/i });
    await expect(bodies.first()).toBeVisible();
  });

  test('shows BackToHome and SocialLinks components', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Let's Go/i })).toBeVisible();
    await expect(page.getByLabel('LinkedIn').first()).toBeVisible();
  });
});
