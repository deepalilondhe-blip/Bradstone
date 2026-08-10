# Bradstone Homeowner Site — E2E Automation Framework

This project contains automated Playwright end-to-end tests for the Bradstone Homeowner e-commerce website ([https://mcstaging.bradstone.com/homeowner/](https://mcstaging.bradstone.com/homeowner/)).

The tests are written in JavaScript and use the **Page Object Model (POM)** design pattern.

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure you have Node.js (v18+) installed.

### 2. Installation
To install the dependencies and Playwright browsers, run:
```bash
npm install
npx playwright install
```

---

## 🏃 Running Tests

The tests are configured to run in **headed mode** by default with custom user agents and settings to successfully bypass Cloudflare Turnstile bot challenges.

### Run All Scenarios
To run all test scenarios sequentially:
```bash
npm test
```

### Run Individual Scenarios
You can run any specific scenario script using the following commands:

1. **Scenario 1: Login** (Validates login and error alerts)
   ```bash
   npx playwright test tests/login.spec.js
   ```

2. **Scenario 2: Create Account** (Registers a new customer dynamically)
   ```bash
   npx playwright test tests/create_account.spec.js
   ```

3. **Scenario 3: Login with Checkout** (Checks out with a registered account logged in mid-checkout)
   ```bash
   npx playwright test tests/login_checkout.spec.js
   ```

4. **Scenario 4: Without Login Checkout (Guest)** (Checks out as a guest shopper)
   ```bash
   npx playwright test tests/guest_checkout.spec.js
   ```

### Debugging Options
*   **Run with Playwright UI Runner:**
    ```bash
    npm run test:ui
    ```
*   **Run in Playwright Inspector (Step-by-step):**
    ```bash
    npm run test:debug
    ```

---

## 📸 Screenshots Directory

Screenshots captured during test execution are saved in dedicated folders at the project root for easy verification:

*   **Login Screenshots:** `screenshots/login/`
    *   `1_details_entered.png`
    *   `2_login_success.png`
    *   `3_login_failed_error.png`
*   **Create Account Screenshots:** `screenshots/create_account/`
    *   `1_registration_filled.png`
    *   `2_registration_success.png`
*   **Login Checkout Screenshots:** `screenshots/login_checkout/`
    *   `1_item_added_to_basket.png`
    *   `2_checkout_loaded.png`
    *   `3_login_details_entered.png`
    *   `4_shipping_method_selected.png`
    *   `5_payment_step_loaded.png`
*   **Guest Checkout Screenshots:** `screenshots/guest_checkout/`
    *   `1_item_added_to_basket.png`
    *   `2_checkout_loaded.png`
    *   `3_guest_address_filled.png`
    *   `4_shipping_method_selected.png`
    *   `5_payment_step_loaded.png`

---

## ⚙️ Configuration Details
*   **Staging Test Credentials:**
    *   **Email:** `ilfas.mansuri@bytestechnolab.com`
    *   **Password:** `Smart@123`
*   **Workers & Concurrency:** Configured to run with `workers: 1` sequentially in `playwright.config.js` to prevent shopping cart session collisions and database conflicts.
