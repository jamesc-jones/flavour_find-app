import { test, expect } from '@playwright/test';

const MOODS = [
  'happy',
  'sad',
  'stressed',
  'energetic',
  'cozy',
  'adventurous',
  'romantic',
  'lazy',
] as const;

test('home page renders mood buttons', async ({ page }) => {
  await page.goto('/');

  for (const mood of MOODS) {
    await expect(page.getByRole('button', { name: mood, exact: true })).toBeVisible();
  }
});

test('mood selection navigates to recipe page', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'cozy', exact: true }).click();

  await expect(page).toHaveURL(/\/recipe\//, { timeout: 20_000 });
  await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ingredients' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Different recipe' })).toBeVisible();
});

test('different recipe button triggers new request', async ({ page }) => {
  await page.goto('/recipe/cozy');

  await expect(page.getByRole('button', { name: 'Different recipe' })).toBeVisible();

  const [response] = await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('/api/recipe/cozy/random') && res.request().method() === 'GET',
    ),
    page.getByRole('button', { name: 'Different recipe' }).click(),
  ]);

  expect(response.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
});
