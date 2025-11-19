import { test, expect } from '@playwright/test';

test('Stores page lists seeded storefronts with Explore buttons', async({ page }) => {
    await page.goto('/stores');

    await expect(page.getByText("Hassan's shop")).toBeVisible();
    await expect(page.getByText("Dani's shop")).toBeVisible();
    await expect(page.getByText("Mhamad's shop")).toBeVisible();

    const exploreButtons = page.getByRole('button', { name: 'Explore' });
    await expect(exploreButtons).toHaveCount(3);

    await exploreButtons.nth(0).click();
    await expect(page).toHaveURL(/\/stores\//);
});

