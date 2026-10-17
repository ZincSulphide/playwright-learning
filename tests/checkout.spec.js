import {test} from "../fixtures/pages"
import { expect} from "@playwright/test"
import { toCents } from "../utils/price";
// import { LoginPage } from "../pages/loginPage";
// import { InventoryPage } from "../pages/inventoryPage";
// import { CartPage } from "../pages/cartPage";
// import { CheckoutPage } from "../pages/checkoutPage";
import { credentials } from "../test-data/credentials";
import { products } from "../test-data/products";
import { checkoutData } from "../test-data/checkoutData";
import { toAsyncStreamable } from "node:stream/iter";

//test data


// test.beforeEach(async ({ loginPage }) => {
//     // const loginPage = new LoginPage(page);

//     await loginPage.goto();
//     await loginPage.login(
//         credentials.standardUser.username,
//         credentials.standardUser.password
//     );
// });//login before each test
test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
});

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

test("Verify cancel on step one returns to cart page with item(s) still in cart", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage
}) => {
    const product = products.backpack;
    await inventoryPage.addToCart(product);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.cancel();

    await expect(page).toHaveURL("/cart.html");
    const cartProducts = await cartPage.getProductNames();
    const cartCount = await cartPage.getProductCount();
    await expect(cartProducts).toContain(product);
    await expect(cartCount).toBe("1");
})

test("Verify cancel on step two returns to inventory page with item(s) still in cart", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage
}) => {
    const product = products.backpack;
    await inventoryPage.addToCart(product);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInformation(
        checkoutData.valid.firstName,
        checkoutData.valid.lastName,
        checkoutData.valid.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.cancel();

    await expect(page).toHaveURL("/inventory.html");
    const cartCount = await cartPage.getProductCount();
    await expect(cartCount).toBe("1");
})

test("Verify the cart total is accurate", async ({
    page,
    inventoryPage,
    cartPage,
    checkoutPage
}) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.boltTShirt);
    await inventoryPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillInformation(
        checkoutData.valid.firstName,
        checkoutData.valid.lastName,
        checkoutData.valid.postalCode
    );
    await checkoutPage.continue();
    const priceArray = checkoutPage.getPrices().allTextContents();


})