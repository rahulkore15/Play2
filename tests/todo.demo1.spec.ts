import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('Eating');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Playing');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Kiding');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Drinking');
  await page.getByTestId('text-input').press('Enter');
  await expect(page.getByText('Eating')).toBeVisible();
  await page.getByText('Playing').click();
  await expect(page.getByText('Playing')).toBeVisible();
  await expect(page.getByText('Drinking')).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: 'Playing' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('listitem').filter({ hasText: 'Kiding' }).getByTestId('todo-item-toggle').check();
  await expect(page.getByTestId('todo-list')).toContainText('Playing');
  await expect(page.getByTestId('todo-list')).toContainText('Kiding');
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});