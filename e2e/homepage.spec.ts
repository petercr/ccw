import { expect, test } from './fixture';

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load and display the hero section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Cape Cod World/i })).toBeVisible();
		// The Sanity subtitle may contain multiple spaces between words, so allow any whitespace.
		await expect(page.getByText(/Bringing Your\s+Ideas\s+To\s+The\s+World/i)).toBeVisible();
	});

	test('should display the "What We Do" section with services', async ({ page }) => {
		const whatWeDoHeading = page.getByRole('heading', {
			name: /What We Do/i,
		});
		await whatWeDoHeading.scrollIntoViewIfNeeded();
		await expect(whatWeDoHeading).toBeVisible();

		await page
			.getByText(/AI Integration/i)
			.first()
			.scrollIntoViewIfNeeded();
		const main = page.getByRole('main');
		for (const label of ['Web Design', 'Development', 'Content & SEO', 'AI Integration', 'Hosting & Deployment']) {
			await expect(main.getByRole('link', { name: label, exact: true })).toBeVisible();
		}
	});

	test('should display navigation links', async ({ page }) => {
		const nav = page.getByRole('navigation', { name: 'Main navigation' });
		await expect(nav.getByRole('link', { name: /Home/i })).toBeVisible();
		await expect(nav.getByRole('link', { name: /Testimonials/i })).toBeVisible();
		await expect(nav.getByRole('link', { name: /Our Work/i })).toBeVisible();
		await expect(nav.getByRole('link', { name: /Contact/i })).toBeVisible();
	});

	test('should display the footer with social links', async ({ page }) => {
		const footer = page.getByRole('contentinfo');
		await expect(footer.getByText('Cape Cod World', { exact: true })).toBeVisible();
		await expect(footer.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
		await expect(footer.getByRole('link', { name: /GitHub/i })).toBeVisible();
		await expect(footer.getByRole('link', { name: /X/i })).toBeVisible();
	});
});
