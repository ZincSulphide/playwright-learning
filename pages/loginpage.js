export class LoginPage{

    constructor(page){

    this.page = page;

    this.username =
        page.getByTestId("user-name");

    this.password =
        page.getByTestId("password");

    this.loginButton =
        page.getByRole("button",
        {name:"Login"});

    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();

    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com");
    }



}