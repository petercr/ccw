import { expect, test } from './fixture';

const SERVICE_PATHS = ['/design', '/development', '/digital-content', '/ai-integration', '/deployment'];

test.describe('SEO plumbing', () => {
	test('sitemap.xml is served as XML and lists static and service pages', async ({ request }) => {
		const response = await request.get('/sitemap.xml');
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('application/xml');

		const body = await response.text();
		expect(body).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
		for (const path of ['/our-work', '/testimonials', '/contact', ...SERVICE_PATHS]) {
			expect(body, `sitemap should include ${path}`).toContain(`${path}</loc>`);
		}
	});

	test('unknown slugs respond with a real 404 status, not a soft 404', async ({ page }) => {
		const response = await page.goto('/definitely-does-not-exist-seo-xyz');
		expect(response?.status()).toBe(404);
		await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
	});

	test('home page carries a location-aware title and ProfessionalService structured data', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/Cape Cod/i);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Cape Cod/i);

		const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
		expect(jsonLd).toBeTruthy();
		const data = JSON.parse(jsonLd ?? '{}');
		expect(data['@type']).toBe('ProfessionalService');
		expect(data.name).toBe('Cape Cod World');
		expect(data.areaServed.map((p: { name: string }) => p.name)).toContain('Cape Cod');
	});

	test('footer service links resolve to live service pages', async ({ page }) => {
		await page.goto('/');
		const footerNav = page.getByRole('navigation', { name: 'Services' });
		const hrefs = await footerNav.getByRole('link').evaluateAll((links) => links.map((l) => l.getAttribute('href')));
		expect(hrefs).toEqual(SERVICE_PATHS);

		for (const path of SERVICE_PATHS) {
			const response = await page.goto(path);
			expect(response?.status(), `${path} should be a published page`).toBe(200);
			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		}
	});
});
