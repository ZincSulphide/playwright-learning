import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

const correct_username = "standard_user";
const incorrect_username = "hello";
const correct_password = "secret_sauce";
const incorrect_password = "abc132";

const Loginpage = new LoginPage(page);

test("Login with empty creds", async ({page}) => {

    await page.goto("https://www.saucedemo.com");
    await page.getByRole("button", {name: 'Login'}).click();
    await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();

});

test("Login with empty password", async ({page}) => {

    await page.goto("https://www.saucedemo.com");
    await page.getByTestId("user-name").fill(correct_username);
    await page.getByRole("button", {name: 'Login'}).click();
    await expect(page.getByText("Epic sadface: Password is required")).toBeVisible();
});

test("Login with incorrect username", async ({page}) => {

    await page.goto("https://www.saucedemo.com");
    await page.getByTestId("user-name").fill(incorrect_username);
    await page.getByTestId("password").fill(correct_password);
    await page.getByRole("button", {name: 'Login'}).click();
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
});

test("Login with incorrect password", async ({page}) => {

    await page.goto("https://www.saucedemo.com");
    await page.getByTestId("user-name").fill(correct_username);
    await page.getByTestId("password").fill(incorrect_password);
    await page.getByRole("button", {name: 'Login'}).click();
    await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
});

test("Login with valid creds", async ({page}) => {

    await page.goto("https://www.saucedemo.com");
    await page.getByTestId("user-name").fill(correct_username);
    await page.getByTestId("password").fill(correct_password);
    await page.getByRole("button", {name: 'Login'}).click();
    await expect(page).toHaveURL(/inventory.html/);
});

