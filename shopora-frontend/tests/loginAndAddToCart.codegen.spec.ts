import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('hassan@gmail.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('hassan123');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.locator('article:nth-child(6) > .relative > .flex.items-center.justify-between.gap-4 > .flex > span:nth-child(2)').click();
  await page.getByRole('button', { name: 'Add to cart' }).nth(5).click();
  await page.getByRole('button', { name: 'Open cart sidebar' }).click();
  await page.getByRole('button', { name: 'Increase quantity of Wirless' }).click();
  await page.getByRole('button', { name: 'Increase quantity of Metalica' }).click();
});