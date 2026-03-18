import { expect, test } from './fixture';

test.describe('Navigation', () => {
  test('should navigate to Testimonials page', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: /Testimonials/i }).click();
    await expect(page).toHaveURL(/testimonials/, { timeout: 15_000 });
  });

  test('should navigate to Our Work page', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: /Our Work/i }).click();
    await expect(page).toHaveURL(/our-work/, { timeout: 15_000 });
  });

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: /Contact/i }).click();
    await expect(page).toHaveURL(/contact/, { timeout: 15_000 });
  });

  test('should navigate back to Home', async ({ page }) => {
    await page.goto('/contact');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: /Home/i }).click();
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/?$/, { timeout: 15_000 });
  });
});
