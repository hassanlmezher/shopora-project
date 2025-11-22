import { test, expect } from '@playwright/test';

test('Favorites page shows empty state when no items are favorited', async ({ page }) => {
    await page.goto('/favorites');

    await expect(
        page.getByText("You haven't favorited anything yet. Tap the heart on a product to save it here.")
    ).toBeVisible();
});
