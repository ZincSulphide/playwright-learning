export class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.firstName = page.getByTestId("firstName");
        this.lastName = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");

        this.continueBtn = page.getByRole("button", {name: "continue"});
        this.overviewTitle = page.getByTestId("title");
        this.errorMessage = page.getByTestId("error");
        this.cancelBtn = page.getByTestId("cancel");

        //pt 2
        
        this.productNames = page.getByTestId("inventory-item-name");
        this.productPrices = page.getByTestId("inventory-item-price");
        this.subtotal = page.getByTestId("subtotal-label");
        this.tax = page.getByTestId("tax-label");
        this.total = page.getByTestId("total-label");
        this.finishBtn = page.getByRole("button", {name: "finish"});
        this.completeHeader = page.getByTestId("complete-header");

    }

    async cancel() {
        await this.cancelBtn.click();
    }

    async fillInformation(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continue() {
        await this.continueBtn.click();
    }
    
    async finishOrder() {
        await this.finishBtn.click();
    }

    getPrices() {
        return this.productPrices;
    }

    getSubtotal() {
        return this.subtotal;
    }

    getTax() {
        return this.tax;
    }

    getTotal() {
        return this.total;
    }



}