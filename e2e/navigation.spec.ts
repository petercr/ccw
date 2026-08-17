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

	const serviceLinks = [
		{ name: 'Design', path: /\/design\/?$/ },
		{ name: 'Development', path: /\/development\/?$/ },
		{ name: 'Digital Content', path: /\/digital-content\/?$/ },
		{ name: 'Deployment', path: /\/deployment\/?$/ },
		{ name: 'AI Integration', path: /\/ai-integration\/?$/ },
	] as const;

	for (const link of serviceLinks) {
		test(`should navigate from homepage to ${link.name}`, async ({ page }) => {
			await page.goto('/');
			await page.getByRole('main').getByRole('link', { name: link.name, exact: true }).click();
			await expect(page).toHaveURL(link.path, { timeout: 15_000 });
			await expect(page.getByRole('heading', { name: link.name, level: 1 })).toBeVisible();
		});
	}
});
