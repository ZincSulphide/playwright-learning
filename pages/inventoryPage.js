export class InventoryPage {
    constructor(page) {
        this.page = page;

        this.cartLink = page.getByTestId('[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async addToCart(productName) {
        await this.page.locator(
            ".inventory-item"
        ).filter({
            hasText: productName
        }).getByRole(
            "button",
            {name: "Add to Cart"}
        ).click();

    }

    async openCart(){
        await this.cartLink.click();
    }

    async removeFromCart(productName){
        await this.page.locator(
            ".inventory-item"
        ).filter({
            hasText: productName
        }).getByRole(
            "button",
            {name: "Remove"}
        ).click();
    }
    async sortBy(option){
        await this.sortDropdown.selectOption({label: option});
    }

    getProductPrices() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

}
