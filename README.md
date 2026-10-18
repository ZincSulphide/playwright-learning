[![Playwright Tests](https://github.com/ZincSulphide/playwright-learning/actions/workflows/playwright.yml/badge.svg)](https://github.com/ZincSulphide/playwright-learning/actions/workflows/playwright.yml)
# Playwright Learning: SauceDemo Test Automation

End-to-end tests for [SauceDemo](https://www.saucedemo.com), written with Playwright and JavaScript. I built this to practise test automation, structuring tests with the Page Object Model and keeping them fast, readable and cross-browser.

## What's covered

- **Login**: valid login, plus data-driven negative cases (empty username and password, empty password, wrong username, wrong password, locked-out user). Each negative test also checks the user stays off the inventory page.
- **Access control**: logout via the menu, blocked access to the inventory after logout, and blocked direct access for a visitor who never logged in
- **Inventory**: sorting by price (low to high, high to low) and by name (A to Z, Z to A)
- **Product details**: opening a product and checking its name, price and description match the list
- **Cart**: adding and removing items, and removing one item while keeping another
- **Checkout**: step 1 validation errors (data-driven) and a full end-to-end purchase complete with cancel checks and total comparison

## Techniques used

- **Page Object Model**: locators and actions live in `pages/`, not in the specs
- **Custom fixtures**: page objects are injected into tests (`fixtures/pages.js`), with JSDoc types so the editor suggests their methods
- **Data-driven tests**: test cases generated from arrays in `test-data/`
- **Authenticate once**: a setup project logs in and saves the session with `storageState`, so other tests don't repeat the login
- **Base URL** configured in `playwright.config.js` instead of hardcoded in tests
- **Tests that can fail**: assertions are checked by breaking them on purpose, for example the A to Z sort test starts from Z to A so a broken dropdown can't pass
- **Cross-browser projects**: Chromium, Firefox and WebKit are configured

## Project structure

```
.
├── fixtures/        # custom test fixtures
├── pages/           # page objects (login, inventory, product details, cart, checkout)
├── test-data/       # credentials, products and data-driven test cases
├── tests/
│   ├── auth.setup.js
│   ├── login.spec.js
│   ├── access.spec.js
│   ├── inventory.spec.js
│   ├── productDetails.spec.js
│   ├── cart.spec.js
│   └── checkout.spec.js
└── playwright.config.js
```

## Getting started

**Prerequisites:** Node.js v24.14.1

```bash
npm install
npx playwright install
```

## Running the tests

Run everything (all browsers):

```bash
npx playwright test
```

Run one browser:

```bash
npx playwright test --project=chromium
```

Run one file:

```bash
npx playwright test tests/login.spec.js --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

## Notes

- The setup project (`tests/auth.setup.js`) runs automatically before the browser projects and writes the saved session to `playwright/.auth/`, which is git-ignored.
- `login.spec.js` and the unauthenticated part of `access.spec.js` clear the saved session so they can test the logged-out state.
- On Windows, Firefox needs the Microsoft Visual C++ Redistributable installed, otherwise it fails to launch.

## Roadmap

- [x] Data-driven login tests
- [x] Authenticate once with `storageState`
- [x] Logout and access-control tests
- [x] Sorting by name
- [x] Product details page
- [x] Cart persistence after a page refresh
- [x] Checkout cancel and totals
- [ ] GitHub Actions CI
