import { test as setup } from '../fixtures/pages';
import { expect } from '@playwright/test';
import { credentials } from '../test-data/credentials';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ loginPage, page }) => {
    // 1. go to the login page
    await loginPage.goto();
    // 2. log in with credentials.standardUser (import credentials)
    await loginPage.login(
        credentials.standardUser.username, 
        credentials.standardUser.password
    );
    // 3. assert you reached the inventory page
    await expect(page).toHaveURL('/inventory.html');
    await page.context().storageState({ path: authFile });
});