export class CheckoutPage {
    constructor(page) {
        this.page = page;

        this.firstName = page.getByTestId("firstName");
        this.lastName = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");

        this.continueBtn = page.getByRole("button", {name: "continue"});
        this.overviewTitle = page.getByTestId("title");

        //pt 2
        
        this.productNames = page.getByTestId("inventory-item-name");
        this.productPrices = page.getByTestId("inventory-item-price");
    }

    async fillInformation(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continue() {
        await this.continueBtn.click();
    }
    



}