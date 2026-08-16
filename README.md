# SauceDemo Playwright Automation

A small test automation project built while learning Playwright.

This project automates core user flows of the [SauceDemo](https://www.saucedemo.com/) application using Playwright and JavaScript. It started as a few simple tests and gradually grew as I learned more about test automation concepts and refactored the project.

## What is covered?

### Login
- User login functionality

### Inventory
- Product sorting by price
  - Low to high
  - High to low

### Cart
- Add products to the cart
- Verify cart item count
- Verify added products
- Remove a product from the cart
- Verify that one product can be removed while another remains

### Checkout
- Verify that the checkout page opens
- Verify products and prices on the checkout overview
- Validate required checkout fields
- Data-driven validation testing
- Complete an end-to-end checkout flow
- Verify successful order completion

## Concepts used

- Playwright
- JavaScript
- Page Object Model (POM)
- Playwright locators
- `getByTestId()`
- Assertions
- Hooks using `beforeEach`
- Custom Playwright fixtures
- Data-driven testing
- Reusable test data

## Project Structure

```text
playwright-learning/
│
├── tests/
│   ├── login.spec.js
│   ├── inventory.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
│
├── pages/
│   ├── loginPage.js
│   ├── inventoryPage.js
│   ├── cartPage.js
│   └── checkoutPage.js
│
├── data/
│   ├── credentials.js
│   ├── checkoutData.js
│   └── products.js
│
├── fixtures/
│   └── pages.js
│
├── playwright.config.js
└── README.md
