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
		{ name: 'Web Design', href: '/design', heading: 'Web Design for Cape Cod Businesses' },
		{ name: 'Development', href: '/development', heading: 'Web & App Development on Cape Cod' },
		{ name: 'Content & SEO', href: '/digital-content', heading: 'Website Content & Local SEO for Cape Cod' },
		{ name: 'AI Integration', href: '/ai-integration', heading: 'Practical AI for Cape Cod Small Businesses' },
		{ name: 'Hosting & Deployment', href: '/deployment', heading: 'Website Hosting & Maintenance on Cape Cod' },
	] as const;

	for (const link of serviceLinks) {
		test(`should navigate from homepage to ${link.name}`, async ({ page }) => {
			await page.goto('/');
			await page.waitForLoadState('networkidle');
			const serviceLink = page.getByRole('main').locator(`a[href="${link.href}"]`, { hasText: link.name });
			await expect(serviceLink).toBeVisible();
			await Promise.all([
				page.waitForURL((url) => url.pathname.replace(/\/$/, '') === link.href, { timeout: 15_000 }),
				serviceLink.click(),
			]);
			await expect(page.getByRole('heading', { name: link.heading, level: 1 })).toBeVisible();
		});
	}
});
