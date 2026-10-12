import { test } from "../fixtures/pages"
import {expect} from "@playwright/test";
import { CheckoutPage } from "../pages/checkoutPage";
import { products } from "../test-data/products";


test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
});

test("Verify products are being added", async ({cartPage, inventoryPage}) => {


    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);

    const cartCount = await cartPage.getProductCount();
    expect(cartCount).toBe("2");

    await inventoryPage.openCart();
    const cartProductNames = await cartPage.getProductNames();

    
    expect(cartProductNames).toContain(products.backpack);
    expect(cartProductNames).toContain(products.bikeLight);
    
    

})

test("Product is removed from cart", async ({cartPage, inventoryPage}) => {


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

test("Verify removing one item from cart while keeping another", async ({cartPage, inventoryPage}) => {


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

test ("Verify that checkout page opens", async ({page, cartPage, inventoryPage}) => {

    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.checkout();

    await expect(checkoutPage.firstName).toBeVisible();
    await expect(checkoutPage.lastName).toBeVisible();
    await expect(checkoutPage.postalCode).toBeVisible();
    await expect(checkoutPage.continueBtn).toBeVisible();
})

test("Cart Badge persists on refresh", async ({
    page,
    inventoryPage,
    cartPage
}) => {
    const product = products.backpack
    await inventoryPage.addToCart(product);
    const cartCount = await cartPage.getProductCount();
    expect(cartCount).toBe("1");

    await page.reload();
    const afterReloadCartCount = await cartPage.getProductCount();
    expect(afterReloadCartCount).toEqual(cartCount);
})

test("Cart persists after refresh", async ({
    page,
    cartPage,
    inventoryPage
}) => {
    const product = products.backpack
    await inventoryPage.addToCart(product);
    await inventoryPage.openCart();
    const cartProductsBeforeReload = await cartPage.getProductNames();
    expect(cartProductsBeforeReload).toContain(product);

    await page.reload();
    const cartProductsAfterReload = await cartPage.getProductNames();
    expect(cartProductsAfterReload).toContain(product);

})
