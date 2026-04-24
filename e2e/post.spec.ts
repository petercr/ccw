import { expect, test } from './fixture';

const hasContent = !!process.env.E2E_HAS_CONTENT;
const POST_SLUG = process.env.E2E_POST_SLUG ?? '';

test.describe('Post page (dynamic)', () => {
  test('404 — navigating to a non-existent slug shows the NotFound page', async ({ page }) => {
    await page.goto('/definitely-does-not-exist-xyz-404');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByText(/could not be found/i)).toBeVisible();
  });

  test('renders the post title as an h1', async ({ page }) => {
    test.skip(!hasContent || !POST_SLUG, 'Requires E2E_HAS_CONTENT and E2E_POST_SLUG');
    await page.goto(`/${POST_SLUG}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('shows author name, published date, and reading time in the meta bar', async ({ page }) => {
    test.skip(!hasContent || !POST_SLUG, 'Requires E2E_HAS_CONTENT and E2E_POST_SLUG');
    await page.goto(`/${POST_SLUG}`);
    await expect(page.locator('time').first()).toBeVisible();
    await expect(page.getByText(/min read/i)).toBeVisible();
  });

  test('renders the post body content', async ({ page }) => {
    test.skip(!hasContent || !POST_SLUG, 'Requires E2E_HAS_CONTENT and E2E_POST_SLUG');
    await page.goto(`/${POST_SLUG}`);
    const body = page.locator('article p, article li');
    await expect(body.first()).toBeVisible();
  });

  test('has a valid JSON-LD script tag', async ({ page }) => {
    test.skip(!hasContent || !POST_SLUG, 'Requires E2E_HAS_CONTENT and E2E_POST_SLUG');
    await page.goto(`/${POST_SLUG}`);
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(jsonLd).not.toBeNull();
    const parsed = JSON.parse(jsonLd!);
    expect(parsed['@type']).toBe('BlogPosting');
  });

  test('shows BackToHome and SocialLinks components', async ({ page }) => {
    test.skip(!hasContent || !POST_SLUG, 'Requires E2E_HAS_CONTENT and E2E_POST_SLUG');
    await page.goto(`/${POST_SLUG}`);
    await expect(page.getByRole('link', { name: /Let's Go/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
  });
});
