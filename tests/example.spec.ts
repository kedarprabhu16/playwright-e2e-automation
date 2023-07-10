import { test, expect } from '@playwright/test';
import * as login from '../res/scout.json';

test.describe('Example-one [Main]', () => {
  test('Example-one test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('Example-two test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Click the get started link .
    await page.getByRole('link', { name: 'Get started' }).click();
  
    // Expects the URL to contain intro.
  });
  test('Example-three test', async ({ page }) => {
      await page.goto('https://playwright.dev/');
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    });
    
   test('Example-four test', async ({ page }) => {
      await page.goto('https://playwright.dev/');
    
      // Click the get started link .
      await page.getByRole('link', { name: 'Get started' }).click();
    
      // Expects the URL to contain intro.
    });
    test('Example-five test', async ({ page }) => {
        await page.goto('https://playwright.dev/');
      
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Playwright/);
      });
      
    test('Example-six test', async ({ page }) => {
        await page.goto('https://playwright.dev/');
      
        // Click the get started link .
        await page.getByRole('link', { name: 'Get started' }).click();
      
        // Expects the URL to contain intro.
      }); 
});
