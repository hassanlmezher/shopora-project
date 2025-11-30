import { test, expect } from '@playwright/test';

const DEMO_EMAIL = 'hassan@gmail.com';
const DEMO_PASSWORD = 'hassan123';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

test.beforeEach(async({ page }) => {
    await page.goto('/login');
});

test('Login form shows validation errors when empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByText('Email address is required.')).toBeVisible();
    await expect(page.getByText('Password is required.')).toBeVisible();
});

test('Login fails with wrong credentials and shows popup', async({ page }) => {
    await page.getByPlaceholder('Email address').fill('wrong@example.com');
    await page.getByPlaceholder('Password').fill('wrongpass');

    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(
        page.getByText('Login failed! Please check your credentials.')
    ).toBeVisible();
});

test('Login succeeds with demo user and redirects to DashboardLoggedIn', async({ page }) => {
    await page.getByPlaceholder('Email address').fill(DEMO_EMAIL);
    await page.getByPlaceholder('password').fill(DEMO_PASSWORD);

    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page).toHaveURL(/\/DashboardLoggedIn$/);
});

test('Login succeeds with admin and redirects to adminDashboard', async ({ page }) => {
    await page.getByPlaceholder('Email address').fill(ADMIN_EMAIL);
    await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);

    await page.getByRole('button', { name: 'Log In '}).click();

    await expect(page).toHaveURL(/\/adminDashboard$/);
});

