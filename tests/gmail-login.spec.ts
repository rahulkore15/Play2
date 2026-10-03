import { expect, test } from '@playwright/test';

test('logs in to Gmail', async ({ page }) => {
  const email = process.env.GMAIL_EMAIL;
  const password = process.env.GMAIL_PASSWORD;

  test.skip(!email || !password, 'Set GMAIL_EMAIL and GMAIL_PASSWORD to run this test.');

  await page.goto('https://accounts.google.com/signin/v2/identifier?service=mail');
  await page.locator('input[type="email"]').fill(email!);
  await page.getByRole('button', { name: /next/i }).click();
  await page.locator('input[type="password"]').waitFor();
  await page.locator('input[type="password"]').fill(password!);
  await page.getByRole('button', { name: /next/i }).click();

  await expect(page).toHaveURL(/mail\.google\.com/, { timeout: 60_000 });
  await expect(page.getByRole('main')).toBeVisible();
});