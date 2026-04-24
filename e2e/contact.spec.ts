import { expect, test } from "./fixture";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    // Wait for React to hydrate — __reactFiber is only attached after hydrateRoot runs
    await page.waitForFunction(() => {
      const btn = document.querySelector('button[type="submit"]');
      return (
        !!btn && Object.keys(btn).some((k) => k.startsWith("__reactFiber"))
      );
    });
  });

  test("loads and shows the Contact heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Contact", level: 1 }),
    ).toBeVisible();
  });

  test("displays all form fields", async ({ page }) => {
    await expect(page.getByLabel("First Name")).toBeVisible();
    await expect(page.getByLabel("Last Name")).toBeVisible();
    await expect(page.getByLabel("Reason For Message")).toBeVisible();
    await expect(page.getByLabel("Additional Info")).toBeVisible();
  });

  test("shows inline validation errors when required fields are blank and form is submitted", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("First name is required")).toBeVisible();
    await expect(page.getByText("Last name is required")).toBeVisible();
    await expect(
      page.getByText("Reason for message is required"),
    ).toBeVisible();
  });

  test("clears errors as fields are filled in", async ({ page }) => {
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("First name is required")).toBeVisible();

    await page.getByLabel("First Name").fill("Jane");
    await expect(page.getByText("First name is required")).not.toBeVisible();
  });

  test("shows success message after a successful submission", async ({
    page,
  }) => {
    test.slow();

    await page.route("https://api.web3forms.com/submit", (route) =>
      route.fulfill({ json: { success: true } }),
    );

    await page.getByLabel("First Name").fill("Jane");
    await page.getByLabel("Last Name").fill("Doe");
    await page.getByLabel("Reason For Message").fill("Hello");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(
      page.getByText(/Thanks! Your message has been sent/i),
    ).toBeVisible();
  });

  test("shows error message when the submission fails", async ({ page }) => {
    test.slow();

    await page.route("https://api.web3forms.com/submit", (route) =>
      route.fulfill({ json: { success: false } }),
    );

    await page.getByLabel("First Name").fill("Jane");
    await page.getByLabel("Last Name").fill("Doe");
    await page.getByLabel("Reason For Message").fill("Hello");
    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.getByText(/Something went wrong/i)).toBeVisible();
  });

  test("shows BackToHome and SocialLinks components", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Let's Go/i })).toBeVisible();
    // getByLabel scopes to aria-label="LinkedIn" in SocialLinks; use .first() since Footer also has a LinkedIn link
    await expect(page.getByLabel("LinkedIn").first()).toBeVisible();
  });
});
