import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/loginPage";
import {InventoryPage} from "../pages/inventoryPage";
import {CartPage} from "../pages/cartPage";
import { credentials } from "../test-data/credentials";

const productName = "Sauce Labs Backpack";
const productNames = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light"
]

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        credentials.standardUser.username,
        credentials.standardUser.password
    );
});//login before each test

test("Verify products are being added", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    for (const product of productNames) {
        await inventoryPage.addToCart(product);
    }

    const cartCount = await cartPage.getProductCount();
    expect(cartCount).toBe("2");

    await inventoryPage.openCart();
    const cartProductNames = await cartPage.getProductNames();

    for (const product of productNames) {
        expect(cartProductNames).toContain(product);
    }
    

})

test("Product is removed from cart", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart(productName);
    const cartCount = await cartPage.getProductCount();
    expect(cartCount).toBe("1");


    await inventoryPage.openCart();

    const productNames = await cartPage.getProductNames();
    expect(productNames).toContain(productName);


    await cartPage.removeProduct(productName);
    const productsAfterRemoval = await cartPage.getProductNames();
    expect(productsAfterRemoval).toHaveLength(0);
})

test("Verify removing one item from cart while keeping another", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    for (const product of productNames) {
        await inventoryPage.addToCart(product);
    }
    
    await inventoryPage.openCart();
    await cartPage.removeProduct("Sauce Labs Bike Light");
    const cartCount = await cartPage.getProductCount();
    const cartProducts = await cartPage.getProductNames();

    expect(cartCount).toBe("1");
    expect(cartProducts).toContain("Sauce Labs Backpack");
    expect(cartProducts).not.toContain("Sauce Labs Bike Light");

})
