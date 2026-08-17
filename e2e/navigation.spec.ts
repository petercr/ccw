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
		{ name: 'Design', href: '/design' },
		{ name: 'Development', href: '/development' },
		{ name: 'Digital Content', href: '/digital-content' },
		{ name: 'Deployment', href: '/deployment' },
		{ name: 'AI Integration', href: '/ai-integration' },
	] as const;

	for (const link of serviceLinks) {
		test(`should navigate from homepage to ${link.name}`, async ({ page }) => {
			await page.goto('/');
			const serviceLink = page.getByRole('main').locator(`a[href="${link.href}"]`, { hasText: link.name });
			await expect(serviceLink).toBeVisible();
			await Promise.all([
				page.waitForURL((url) => url.pathname.replace(/\/$/, '') === link.href, { timeout: 15_000 }),
				serviceLink.click(),
			]);
			await expect(page.getByRole('heading', { name: link.name, level: 1 })).toBeVisible();
		});
	}
});
