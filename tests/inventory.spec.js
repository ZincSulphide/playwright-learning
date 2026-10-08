import { test } from '../fixtures/pages'
import {expect} from '@playwright/test'
import { products } from '../test-data/products';


const productNames = Object.values(products);
const expectedAZ = [...productNames].sort((a, b) => a.localeCompare(b));
const expectedZA = [...productNames].sort((a, b) => b.localeCompare(a));
const sortingPrice = [
    {
        title: "Products are sorted according to price, ascending",
        option: "Price (low to high)",
        order: "ascending"
    },
    {
        title: "Products are sorted according to price, descending",
        option: "Price (high to low)",
        order: "descending"
    }
]


test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
});

test.describe("Products are sorted by price", () => {

    for (const sortTest of sortingPrice) {
        test(sortTest.title, async ({
            inventoryPage
        }) => {
            
            await inventoryPage.sortBy(sortTest.option);
            const prices = await inventoryPage.getProductPrices().allTextContents();
            console.log(prices);

            const numPrices = prices.map(
                x => Number(x.replace("$", ""))
            );

            let sortedNumPrices;

            if (sortTest.order == "ascending") {
                sortedNumPrices = [...numPrices]
                .sort((a, b) => a - b);
            } else {
                sortedNumPrices = [...numPrices]
                .sort((a, b) => b - a);
            }
            expect(numPrices).toEqual(sortedNumPrices);
        })
    }
})

test("Products are sorted alphabetically (Z to A)", async ({
    inventoryPage
}) => {
    const sortOption = "Name (Z to A)";
    await inventoryPage.sortBy(sortOption);
    await expect(inventoryPage.getProductNames()).toHaveCount(productNames.length);
    await expect(inventoryPage.getProductNames()).toHaveText(expectedZA);
    
    
})

test("Products are sorted alphabetically (A to Z)", async ({
    inventoryPage
}) => {
    
    const sortOption = "Name (A to Z)";
    const tempSort = "Name (Z to A)";
    await inventoryPage.sortBy(tempSort);
    await expect(inventoryPage.getProductNames()).toHaveCount(productNames.length);
    await expect(inventoryPage.getProductNames()).toHaveText(expectedZA);

    await inventoryPage.sortBy(sortOption);
    await expect(inventoryPage.getProductNames()).toHaveCount(productNames.length);
    await expect(inventoryPage.getProductNames()).toHaveText(expectedAZ);

    
    
})


