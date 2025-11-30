import { test, expect } from '@playwright/test';

test('User can sign up and is redirected to login', async ({ page }) => {
    await page.goto('/signup');

    const uniqueEmail= `testuser+${Date.now()}@example.com`;
    const password = 'password123';

    await page.getByPlaceholder('Email address').fill(uniqueEmail);
    await page.getByPlaceholder('Password').nth(0).fill(password);
    await page.getByPlaceholder('Confirm password').fill(password);

    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(
        page.getByText('Signup successful! Redirecting to login.')
    ).toBeVisible();

    await page.waitForURL('**/login');
    await expect(page).toHaveURL(/\/login$/);
});

