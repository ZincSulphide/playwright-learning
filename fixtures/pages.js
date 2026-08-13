import { test as base} from "@playwright/test";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage"
import { LoginPage } from "../pages/loginPage";
import { CheckoutPage } from "../pages/checkoutPage";

export const test = base.extend({
    inventoryPage: async ({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    }
})

