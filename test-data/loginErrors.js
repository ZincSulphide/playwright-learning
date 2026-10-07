
import { credentials } from "./credentials";


export const loginErrors = 
[
    {
        title : "Verify that login fails with empty fields",
        username: "",
        password: "",
        expectedError: "Epic sadface: Username is required"
    },
    {
        title : "Verify that login fails with empty password",
        username: credentials.standardUser.username,
        password: "",
        expectedError: "Epic sadface: Password is required"
    },
    {
        title : "Verify that login fails with incorrect username",
        username: credentials.incorrectUserName.username,
        password: credentials.incorrectUserName.password,
        expectedError: "Epic sadface: Username and password do not match any user in this service"
    },
    {
        title : "Verify that login fails with incorrect password",
        username: credentials.incorrectPassword.username,
        password: credentials.incorrectPassword.password,
        expectedError: "Epic sadface: Username and password do not match any user in this service"
    },
    {
        title : "Verify that login fails with locked out user with appropriate error",
        username: credentials.lockedOutUser.username,
        password: credentials.lockedOutUser.password,
        expectedError: "Epic sadface: Sorry, this user has been locked out."
    }

]