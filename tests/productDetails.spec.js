import { test } from "../fixtures/pages"
import {expect} from "@playwright/test";
import { products } from "../test-data/products";

test.beforeEach(async ({inventoryPage}) => {
    await inventoryPage.goto();
})

test("Verify that selected product matches product details in the list", async ({
    inventoryPage,
    productDetailsPage
}) => {
    const card = inventoryPage.getProductCard(products.backpack);
    const listName = await card.getByTestId("inventory-item-name").textContent();
    const listPrice = await card.getByTestId("inventory-item-price").textContent();
    const listDescr = await card.getByTestId("inventory-item-desc").textContent();

    // console.log(listName);
    // console.log(listPrice);
    // console.log(listDescr);

    await inventoryPage.openProduct(products.backpack);
    await expect(productDetailsPage.getProductName()).toHaveText(listName);
    await expect(productDetailsPage.getProductDescr()).toHaveText(listDescr);
    await expect(productDetailsPage.getProductPrice()).toHaveText(listPrice); 
})

test("Verify that adding to cart increases the counter in the cart badge", async ({
    inventoryPage, 
    productDetailsPage,
    cartPage
}) => {
    await inventoryPage.openProduct(products.backpack);
    await productDetailsPage.addToCart();
    const cartCount = await cartPage.getProductCount();
    expect(cartCount).toBe("1");
})

test("Verify that clicking back button returns to inventory", async ({
    productDetailsPage,
    inventoryPage,
    page
}) => {
    await inventoryPage.openProduct(products.backpack);
    await productDetailsPage.goBack();
    await expect(page).toHaveURL('/inventory.html');
})