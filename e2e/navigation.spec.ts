import { expect, test } from './fixture';

test.describe('Navigation', () => {
  test('should navigate to Testimonials page', async ({
    agentForPage,
    page,
  }) => {
    await page.goto('/');
    const agent = await agentForPage(page);

    await agent.aiAct('Click on the "Testimonials" link in the navigation bar');
    await expect(page).toHaveURL(/testimonials/, { timeout: 15_000 });
  });

  test('should navigate to Our Work page', async ({
    agentForPage,
    page,
  }) => {
    await page.goto('/');
    const agent = await agentForPage(page);

    await agent.aiAct('Click on the "Our Work" link in the navigation bar');
    await expect(page).toHaveURL(/our-work/, { timeout: 15_000 });
  });

  test('should navigate to Contact page', async ({
    agentForPage,
    page,
  }) => {
    await page.goto('/');
    const agent = await agentForPage(page);

    await agent.aiAct('Click on the "Contact" link in the navigation bar');
    await expect(page).toHaveURL(/contact/, { timeout: 15_000 });
  });

  test('should navigate back to Home', async ({
    agentForPage,
    page,
  }) => {
    await page.goto('/contact');
    const agent = await agentForPage(page);

    await agent.aiAct('Click on the "Home" link in the navigation bar');
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/?$/, { timeout: 15_000 });
  });
});
