import { test } from '../fixtures/pages'
import { expect} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { credentials } from '../test-data/credentials';
import { log } from 'node:console';



test("Login with empty creds", async ({
    loginPage,
    page
}) => {
    // const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        "",
        ""
    );
    await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();

});

test("Login with empty password", async ({
    loginPage,
    page
}) => {
    // const loginpage = new LoginPage(page);
    await loginPage.goto("https://www.saucedemo.com");
    await loginPage.login(
        credentials.standardUser.username,
        ""
    );
    await expect(page.getByText("Epic sadface: Password is required")).toBeVisible();
});

test("Login with incorrect username", async ({
    loginPage,
    page
}) => {
    // const loginPage = new LoginPage(page);
    await loginPage.goto("https://www.saucedemo.com");
    await loginPage.login(
        credentials.incorrectUserName.username,
        credentials.incorrectUserName.password
    );
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
});

test("Login with incorrect password", async ({
    loginPage,
    page
}) => {
    // const loginPage = new LoginPage(page);
    await loginPage.goto("https://www.saucedemo.com");
    await loginPage.login(
        credentials.incorrectPassword.username,
        credentials.incorrectPassword.password
    )
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
});

test("Login with valid creds", async ({
    page,
    loginPage
}) => {
    // const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
        credentials.standardUser.username,
        credentials.standardUser.password
    )
    await expect(page).toHaveURL(/inventory.html/);
});

