export class CartPage {
    constructor(page) {
        this.page = page;
        
        this.cartBadge = page.getByTestId("shopping-cart-badge");
        this.checkoutButton = page.getByTestId("checkout");
        this.productNames = page.getByTestId("inventory-item-name");

    }

    async checkout(){
        await this.checkoutButton.click();
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    async removeProduct(productName) {
        const productId = productName.toLowerCase().replaceAll(" ", "-");
        await this.page.getByTestId(`remove-${productId}`).click();
    }

    async getProductCount() {
        return await this.cartBadge.textContent();
    }
}