import { expect, test } from './fixture';

// Discovered from the homepage "What We Do" links in the running app.
const CATEGORY_PAGES = [
	{
		path: '/design',
		title: 'Design',
		body: /It all starts with a great look/i,
	},
	{
		path: '/development',
		title: 'Development',
		body: /idea on a napkin/i,
	},
	{
		path: '/digital-content',
		title: 'Digital Content',
		body: /Content that sounds like you/i,
	},
	{
		path: '/deployment',
		title: 'Deployment',
		body: /staging.+live/i,
	},
	{
		path: '/ai-integration',
		title: 'AI Integration',
		body: /Don.t miss the AI wave/i,
	},
] as const;

for (const category of CATEGORY_PAGES) {
	test.describe(`Category page ${category.path}`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(category.path);
			await page.waitForFunction(() => {
				const article = document.querySelector('article');
				return !!article && Object.keys(article).some((k) => k.startsWith('__reactFiber'));
			});
		});

		test('renders the category title as an h1', async ({ page }) => {
			await expect(page.getByRole('heading', { name: category.title, level: 1 })).toBeVisible();
		});

		test('category description/body text is visible', async ({ page }) => {
			await expect(page.getByText(category.body)).toBeVisible();
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
	});
}

test.describe('Category page (missing slug)', () => {
	test('404 — navigating to a non-existent slug shows the NotFound page', async ({ page }) => {
		await page.goto('/definitely-does-not-exist-category-xyz-404');
		await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
		await expect(page.getByText(/could not be found/i)).toBeVisible();
	});
});
