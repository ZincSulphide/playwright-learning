import {test, expect} from '@playwright/test'
import {LoginPage} from "../pages/loginPage"
import { InventoryPage } from '../pages/inventoryPage'
import { credentials } from '../test-data/credentials'

const sortingTests = [
    {
        option: "Price (low to high)",
        order: "ascending"
    },
    {
        option: "Price (high to low)",
        order: "descending"
    }
];




test ("Products are sorted by price", async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);//will change creds later acc to credentials.

    for (const sortTest of sortingTests) {
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
    }

    

})