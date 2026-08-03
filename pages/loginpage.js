export class LoginPage {

    constructor(page) {
        this.page = page;

        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com");
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}