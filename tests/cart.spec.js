import {test, expect} from "@playwright/test";
import {LoginPage} from "../pages/loginPage";
import {InventoryPage} from "../pages/inventoryPage";
import {CartPage} from "../pages/cartPage";
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

test("Verify products are being added", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);

    const cartCount = await cartPage.getProductCount();
    expect(cartCount).toBe("2");

    await inventoryPage.openCart();
    const cartProductNames = await cartPage.getProductNames();

    
    expect(cartProductNames).toContain(products.backpack);
    expect(cartProductNames).toContain(products.bikeLight);
    
    

})

test("Product is removed from cart", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart(products.backpack);
    const cartCount = await cartPage.getProductCount();
    expect(cartCount).toBe("1");


    await inventoryPage.openCart();

    const productNames = await cartPage.getProductNames();
    expect(productNames).toContain(products.backpack);


    await cartPage.removeProduct(products.backpack);
    const productsAfterRemoval = await cartPage.getProductNames();
    expect(productsAfterRemoval).toHaveLength(0);
})

test("Verify removing one item from cart while keeping another", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    
    
    await inventoryPage.openCart();
    await cartPage.removeProduct(products.bikeLight);
    const cartCount = await cartPage.getProductCount();
    const cartProducts = await cartPage.getProductNames();

    expect(cartCount).toBe("1");
    expect(cartProducts).toContain(products.backpack);
    expect(cartProducts).not.toContain(products.bikeLight);

})

test ("Verify that checkout page opens", async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await expect(checkoutPage.firstName).toBeVisible();
    await expect(checkoutPage.lastName).toBeVisible();
    await expect(checkoutPage.postalCode).toBeVisible();
    await expect(checkoutPage.continueBtn).toBeVisible();
})
