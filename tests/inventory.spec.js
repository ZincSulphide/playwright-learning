import {test, expect} from '@playwright/test'
import {LoginPage} from "../pages/loginpage"
import { InventoryPage } from '../pages/inventoryPage'

test ("Products are sorted by price, low to high", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");//will change creds later acc to credentials.js

    await inventoryPage.sortBy("Price (low to high)");
    const prices = await inventoryPage.getProductPrices().allTextContents();

    console.log(prices);
})