import { test, expect } from '@playwright/test';

test('Lumina Home Page loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Verify Title
  await expect(page).toHaveTitle(/Lumina | Digital Art Gallery/);
  
  // Verify Logo in Header (Specific locator to avoid footer match)
  const logo = page.locator('header').getByText('LUMINA');
  await expect(logo).toBeVisible();
  
  // Verify Gallery Sections (Wait for it since the gallery is client-side loaded)
  const heading = page.locator('h2', { hasText: 'Discover Digital Excellence' });
  await expect(heading).toBeVisible({ timeout: 10000 });
});

test('Lumina Gallery Grid displays items', async ({ page }) => {
  await page.goto('/');
  
  // Wait for the specific loading state to finish if it exists, 
  // or just wait for the ArtCards to appear
  const artCards = page.locator('.group.relative.break-inside-avoid');
  
  // Wait for at least one card to be visible with a timeout
  await expect(artCards.first()).toBeVisible({ timeout: 10000 });
  
  const count = await artCards.count();
  expect(count).toBeGreaterThan(0);
});

test('Featured Creators section is visible on Home page', async ({ page }) => {
  await page.goto('/');
  
  const featuredHeading = page.locator('h2', { hasText: 'Featured Creators' });
  await expect(featuredHeading).toBeVisible({ timeout: 10000 });
  
  const creatorLinks = page.locator('a[href^="/artist/"]');
  // At least 3 featured + cards in gallery
  const count = await creatorLinks.count();
  expect(count).toBeGreaterThan(3);
});

test('Artist Navigation works', async ({ page }) => {
  await page.goto('/');
  
  // Wait for content to load
  const artistLink = page.locator('a[href^="/artist/"]').first();
  await expect(artistLink).toBeVisible({ timeout: 10000 });
  
  const artistName = await artistLink.textContent();
  // Use evaluate to click the element directly in the browser context
  // This bypasses Playwright's hit-testing which can be flaky with CSS columns
  await artistLink.evaluate(el => (el as HTMLElement).click());
  
  // Verify navigation to artist page
  await expect(page).toHaveURL(/\/artist\/.*/);
  
  // Verify artist name in the profile
  if (artistName) {
    const profileHeading = page.locator('h1');
    await expect(profileHeading).toHaveText(artistName);
  }
});

test('Artists Page loads and displays creators', async ({ page }) => {
  await page.goto('/artists');
  
  // Verify Title/Heading
  const heading = page.locator('h1', { hasText: 'Digital Creators' });
  await expect(heading).toBeVisible();
  
  // Verify Artist Cards
  const artistCards = page.locator('a[href^="/artist/"]');
  await expect(artistCards.first()).toBeVisible({ timeout: 10000 });
  
  const count = await artistCards.count();
  expect(count).toBeGreaterThan(0);
  
  // Verify interaction - click an artist
  const firstArtistName = await artistCards.first().locator('h3').textContent();
  await artistCards.first().click();
  
  await expect(page).toHaveURL(/\/artist\/.*/);
  if (firstArtistName) {
    await expect(page.locator('h1')).toHaveText(firstArtistName);
  }
});
