import { test } from '../fixtures/pages'
import {expect} from '@playwright/test'


test.describe("Logged-in user", () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.goto();
    });

    // your three existing tests move in here
    test("Logout option is visible in the menu side panel", async ({
        inventoryPage
    }) => {
        await inventoryPage.openMenu();
        await expect(inventoryPage.logoutLink).toBeVisible();
    })

    test("Logging out returns to the login page", async ({
        page, 
        inventoryPage
    }) => {
        await inventoryPage.logout();
        await expect(page).toHaveURL("/");

    })
});

test.describe("Unauthenticated visitor", () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test("Direct access to inventory is blocked", async ({ 
        loginPage, 
        inventoryPage, 
        page 
    }) => {
        // go straight to the inventory page
        await inventoryPage.goto();
      // assert the error text (same message as before)
        await expect(loginPage.getError()).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
        // assert the URL is still the login page
        await expect(page).toHaveURL("/");
    });
});

