import { test } from '../fixtures/pages'
import { expect} from '@playwright/test';
// import { LoginPage } from '../pages/loginpage';
import { credentials } from '../test-data/credentials';
import { loginErrors } from '../test-data/loginErrors';
// import { log } from 'node:console';


for(const {title, username, password, expectedError} of loginErrors) {
    test(title, async ({page, loginPage}) => {
        await loginPage.goto();
        await loginPage.login(username, password);

        await expect(loginPage.getError()).toHaveText(expectedError);
        await expect(page).not.toHaveURL('/inventory.html');
    })
}


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


