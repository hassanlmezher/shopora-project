import { test, expect } from 'playwright/test';

test('Welcome page -> Get started goes to guest dashboard', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Shop')).toBeVisible();
    await expect(page.getByText('smart.')).toBeVisible();
    await expect(page.getByText('Live better.')).toBeVisible();

    await page.getByRole('button', { name: 'Get started' }).click();

    await expect(page).toHaveURL(/\/dashboard$/);
});