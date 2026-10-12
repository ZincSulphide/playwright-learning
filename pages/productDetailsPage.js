export class ProductDetailsPage {
    constructor(page) {
        this.page = page;
        this.itemName = page.getByTestId("inventory-item-name");
        this.itemPrice = page.getByTestId("inventory-item-price");
        this.itemDescr = page.getByTestId("inventory-item-desc");

        this.addToCartBtn = page.getByTestId("add-to-cart");
        this.backBtn = page.getByTestId("back-to-products");
        this.removeBtn = page.getByTestId("remove");
    }

    async goBack() {
        await this.backBtn.click();
    }
    async addToCart(){
        await this.addToCartBtn.click();
    }

    async removeFromCart() {
        await this.removeBtn.click();
    }

    getProductName() {
        return this.itemName;
    }
    getProductDescr() {
        return this.itemDescr;
    }
    getProductPrice() {
        return this.itemPrice;
    }


}