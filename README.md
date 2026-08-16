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
```

### Page Object Model

The project uses the Page Object Model to keep page locators and actions separate from the test logic.

For example:
```
await inventoryPage.addToCart(products.backpack);
await inventoryPage.openCart();
await cartPage.checkout();
```
This keeps the tests easier to read and maintain.

### Custom Fixtures

Custom Playwright fixtures are used to provide Page Objects directly to tests.

Instead of manually creating Page Objects:
```
const inventoryPage = new InventoryPage(page);
const cartPage = new CartPage(page);
```
Tests can directly request them:
```
test("Example test", async ({ inventoryPage, cartPage }) => {
    // test steps
});
```
### Test Data

Reusable test data is stored separately from the test files.

Examples include:

- User credentials
- Product names
- Checkout information
- Checkout validation cases

This helps keep the test files focused on test actions and assertions.

### Running the Tests

Install dependencies:
```
npm install

Run the full test suite:

npx playwright test
```
### Run a specific test file:
```
npx playwright test tests/inventory.spec.js
```

### Run tests with the Playwright UI:
```
npx playwright test --ui
```

### Learning Journey

This is a learning project, and the structure evolved as new concepts were introduced.

The project started with basic Playwright tests and was gradually refactored to include:

- Page Objects
- Reusable test data
- Shared login setup with beforeEach
- Custom fixtures for Page Objects
- Data-driven validation testing

More concepts and improvements will be added as I continue learning Playwright and test automation.

### Tech Stack
- JavaScript
- Playwright
- Node.js
