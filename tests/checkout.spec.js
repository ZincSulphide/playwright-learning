import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { credentials } from "../test-data/credentials";
import { products } from "../test-data/products";



test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        credentials.standardUser.username,
        credentials.standardUser.password
    );
});//login before each test


test("Verify that checkout is successful", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation("John", "Doe", "1247");
    await checkoutPage.continue();

    const productNames = await checkoutPage.productNames.allTextContents();
    const productPrices = await checkoutPage.productPrices.allTextContents();

    expect(productNames).toContain(products.backpack);
    expect(productPrices).toContain("$29.99");

    await expect(checkoutPage.overviewTitle).toHaveText("Checkout: Overview");

}) 

test ("Verify behavior when first name field not filled", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation("", "Doe", "1247");
    await checkoutPage.continue();

    const firstNameError = await page.getByTestId("error").allTextContents();

    expect(firstNameError).toContain("Error: First Name is required");
})