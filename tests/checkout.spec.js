import {test} from "../fixtures/pages"
import { expect} from "@playwright/test"
import { LoginPage } from "../pages/loginPage";
// import { InventoryPage } from "../pages/inventoryPage";
// import { CartPage } from "../pages/cartPage";
// import { CheckoutPage } from "../pages/checkoutPage";
import { credentials } from "../test-data/credentials";
import { products } from "../test-data/products";
import { checkoutData } from "../test-data/checkoutData";

//test data


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        credentials.standardUser.username,
        credentials.standardUser.password
    );
});//login before each test


test("Verify that checkout step 1 is successful", async ({
    inventoryPage,
    cartPage,
    checkoutPage
}) => {
    // const inventoryPage = new InventoryPage(page);
    // const cartPage = new CartPage(page);
    // const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
        checkoutData.valid.firstName,
        checkoutData.valid.lastName,
        checkoutData.valid.postalCode
    );
    await checkoutPage.continue();

    const productNames = await checkoutPage.productNames.allTextContents();
    const productPrices = await checkoutPage.productPrices.allTextContents();

    expect(productNames).toContain(products.backpack);
    expect(productPrices).toContain("$29.99");

    await expect(checkoutPage.overviewTitle).toHaveText("Checkout: Overview");

}) 

test ("Verify all validation errors appear accordingly", async ({
    inventoryPage,
    cartPage,
    checkoutPage
}) => {

    // const inventoryPage = new InventoryPage(page);
    // const cartPage = new CartPage(page);
    // const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();

    for (const testCase of checkoutData.validationCases) {
        await checkoutPage.fillInformation(
            testCase.firstName, 
            testCase.lastName, 
            testCase.postalCode
        );
        await checkoutPage.continue();

        const error = await checkoutPage.errorMessage.allTextContents();
        expect(error).toContain(testCase.error);
    }
})

test ("Verify that user can successfully checkout", async ({
    inventoryPage,
    cartPage,
    checkoutPage
}) => {
    // const inventoryPage = new InventoryPage(page);
    // const cartPage = new CartPage(page);
    // const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
        checkoutData.valid.firstName, 
        checkoutData.valid.lastName, 
        checkoutData.valid.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText("Thank you for your order!");
})