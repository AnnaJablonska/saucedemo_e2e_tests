A comprehensive **End-to-End (E2E)** test automation project using Playwright with TypeScript for testing SauceDemo website functionality.

Prepared for recruitment purposes - demonstrating E2E testing skills and Page Object Model implementation. 


## � Quick Setup

### Prerequisites
- Node.js (v16 or higher)

### Installation & Basic Configuration
```bash
# 1. Clone and install
git clone <repository-url>
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Run all tests
npx playwright test

# 4. View test results
npx playwright show-report
```

### Quick Test Commands
```bash
# Run all E2E tests
npx playwright test tests/

# Run with visible browser
npx playwright test tests/ --headed

# Run specific test file
npx playwright test tests/purchase-flow.spec.ts
```

---

##  Project Structure

```
saucedemo-e2e/
├── 🧪 tests/                  # E2E Test Files
│   ├── purchase-flow.spec.ts   # Complete purchase workflow tests
│   ├── login-validation.spec.ts # Authentication and login tests  
│   └── sorting.spec.ts         # Product sorting functionality tests
├── 📄 pages/                  # Page Object Model classes
│   ├── BasePage.ts            # Common functionality for all pages
│   ├── LoginPage.ts           # Login page interactions
│   ├── InventoryPage.ts       # Product inventory page
│   ├── CartPage.ts            # Shopping cart functionality
│   └── CheckoutPage.ts        # Checkout process handling
├── playwright.config.ts       # Playwright configuration
├── package.json              # Project dependencies
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 🎯 E2E Test Overview

### **Target Application**: SauceDemo Website
- **URL**: `https://www.saucedemo.com/`
- **Purpose**: Test complete user workflows, UI interactions, and business logic
- **Technology**: Playwright browser automation with TypeScript
- **Pattern**: Page Object Model (POM) with BasePage inheritance
- **Browsers**: Chromium

---

## 🧪 Running E2E Tests

E2E tests validate the SauceDemo website functionality through browser automation.

### **Run All E2E Tests**
```bash
npx playwright test tests/
```

### **Run Specific Test Files**
```bash
# Purchase flow tests
npx playwright test tests/purchase-flow.spec.ts

# Login validation tests  
npx playwright test tests/login-validation.spec.ts

# Product sorting tests
npx playwright test tests/sorting.spec.ts
```

### **Test Execution Options**
```bash
# Run with visible browser (headed mode)
npx playwright test tests/ --headed

# Run with interactive UI mode
npx playwright test tests/ --ui

# Generate HTML report
npx playwright test tests/ --reporter=html

# Debug mode (step through tests)
npx playwright test tests/ --debug

# Run specific browser only
npx playwright test tests/ --project=chromium

# Run tests in parallel
npx playwright test tests/ --workers=4
```

### **E2E Test Scenarios**
1. **Complete Purchase Flow** - Add items to cart, remove items, complete checkout
2. **Login Validation** - Test different user types and authentication scenarios
3. **Product Sorting** - Validate sorting functionality (A-Z, Z-A)

> **Note**: Some tests may be marked with `test.fixme()` due to UI issues on the website itself, not problems with the test implementation.



---

## 🎛️ Advanced Test Execution

### **Cross-Browser Testing**
```bash
# Run tests on all configured browsers
npx playwright test tests/

# Run on specific browser
npx playwright test tests/ --project=chromium
npx playwright test tests/ --project=firefox
npx playwright test tests/ --project=webkit
```

### **Performance & Parallel Execution**
```bash
# Run tests in parallel with custom worker count
npx playwright test tests/ --workers=4

# Run tests sequentially (useful for debugging)
npx playwright test tests/ --workers=1
```

---

## 📊 Test Reports & Results

### **HTML Report**
```bash
# Generate and open HTML report
npx playwright test tests/ --reporter=html
npx playwright show-report
```

### **Different Report Formats**
```bash
# List format (detailed console output)
npx playwright test tests/ --reporter=list
```

---

## 🏗️ Architecture & Patterns

### **Page Object Model (POM)**
- **BasePage.ts** - Common functionality and shared locators
- **Inheritance** - All page classes extend BasePage for code reuse
- **Encapsulation** - Each page class manages its own locators and methods
- **Reusability** - Shared methods like `getCartItemsCount()` in BasePage (only to show the POM structure)

### **Test Organization**
- **test.describe()** - Group related test scenarios  
- **test.step()** - Break down test actions for detailed reporting
- **test.beforeEach()** - Setup page objects and navigate to starting state

### **Configuration**
- **playwright.config.ts** - Centralized configuration for browser settings
- **Cross-browser Testing** - Support only for Chromium
- **Parallel Execution** - Configurable worker threads for faster test runs

---

## 🐛 Debugging & Troubleshooting

### **Debug Mode**
```bash
# Debug specific test (step-by-step execution)
npx playwright test tests/purchase-flow.spec.ts --debug

# Generate trace files for failed tests
npx playwright test tests/ --trace=retain-on-failure
```

### **Inspect Elements**
```bash
# Open Playwright Inspector
npx playwright codegen https://www.saucedemo.com/

```
---

## 🎯 Quick Commands Reference

```bash
# 🧪 Basic Test Execution
npx playwright test tests/                        # Run all E2E tests
npx playwright test tests/ --headed               # With visible browser  
npx playwright test tests/ --ui                   # Interactive mode

# 🔧 Debugging & Development
npx playwright test tests/ --debug                # Step-by-step debugging

# 📊 Reporting & Output
npx playwright test tests/ --reporter=html        # HTML report


