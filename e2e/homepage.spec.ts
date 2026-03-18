import { expect, test } from './fixture';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and display the hero section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /Cape Cod World/i }),
    ).toBeVisible();
    await expect(
      page.getByText(/Bringing Your Ideas To The World/i),
    ).toBeVisible();
  });

  test('should display the "What We Do" section with services', async ({
    page,
  }) => {
    const whatWeDoHeading = page.getByRole('heading', {
      name: /What We Do/i,
    });
    await whatWeDoHeading.scrollIntoViewIfNeeded();
    await expect(whatWeDoHeading).toBeVisible();

    await page
      .getByText(/AI Integration/i)
      .first()
      .scrollIntoViewIfNeeded();
    await expect(page.getByText(/Design/i).first()).toBeVisible();
    await expect(page.getByText(/Development/i).first()).toBeVisible();
    await expect(page.getByText(/Digital Content/i).first()).toBeVisible();
    await expect(page.getByText(/Deployment/i).first()).toBeVisible();
    await expect(page.getByText(/AI Integration/i).first()).toBeVisible();
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
