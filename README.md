# Playwright Learning: SauceDemo Test Automation

End-to-end tests for [SauceDemo](https://www.saucedemo.com), written with Playwright and JavaScript. I built this to practise test automation, structuring tests with the Page Object Model and keeping them fast, readable and cross-browser.

## What's covered

- **Login**: valid login, plus data-driven negative cases (empty fields, wrong credentials, locked-out user)
- **Inventory**: sorting products by price
- **Cart**: adding and removing items
- **Checkout**: step 1 validation errors and a full end-to-end purchase


## Techniques used

- **Page Object Model**: locators and actions live in `pages/`, not in the specs
- **Custom fixtures**: page objects are injected into tests (`fixtures/pages.js`)
- **Data-driven tests**: test cases generated from arrays in `test-data/`
- **Authenticate once**: a setup project logs in and saves the session with `storageState`, so other tests don't repeat the login
- **Cross-browser**: Chromium, Firefox and WebKit projects
- **Base URL** configured in `playwright.config.js` instead of hardcoded in tests

## Project structure

```
.
├── fixtures/        # custom test fixtures
├── pages/           # page objects (login, inventory, ...)
├── test-data/       # credentials and data-driven test cases
├── tests/
│   ├── auth.setup.js
│   ├── login.spec.js
│   ├── inventory.spec.js
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
- `login.spec.js` clears the saved session so the login page can be tested logged out.

