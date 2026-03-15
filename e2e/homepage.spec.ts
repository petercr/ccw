import { expect, test } from './fixture';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and display the hero section', async ({
    agentForPage,
    page,
  }) => {
    const agent = await agentForPage(page);

    await agent.aiAssert('The page has loaded and shows "Cape Cod World"');
    await agent.aiAssert(
      'There is a tagline that says "Bringing Your Ideas To The World"',
    );
  });

  test('should display the "What We Do" section with services', async ({
    agentForPage,
    page,
  }) => {
    // Scroll to the "What We Do" heading and assert it's visible
    await page.getByRole('heading', { name: /What We Do/i }).scrollIntoViewIfNeeded();
    const agent = await agentForPage(page);

    await agent.aiAssert(
      'There is a heading containing "What We Do" visible on the page',
    );

    // Scroll further to make the services list visible
    await page.getByText(/AI Integration/i).first().scrollIntoViewIfNeeded();
    await agent.aiAssert(
      'The page contains links or text for Design, Development, Digital Content, Deployment, and AI Integration',
    );
  });

  test('should display navigation links', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(
      nav.getByRole('link', { name: /Testimonials/i }),
    ).toBeVisible();
    await expect(
      nav.getByRole('link', { name: /Our Work/i }),
    ).toBeVisible();
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
