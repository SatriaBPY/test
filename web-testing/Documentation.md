# Web Automation Documentation – Demoblaze

## Platform Under Test
 - **Web Application**: Demoblaze.
 - **Automation Framework**: Playwright (TypeScript)
 - **Reporting**: Allure + Custom Console Reporter
 
## 1. Overview
This project automates the complete end-to-end (E2E) purchase flow of an e-commerce application using a structured and scalable automation framework.

The implementation focuses on two key objectives:
- **Fully validating**: the required UI purchase flow (as specified in the assessment).
- **Demonstrating**: scalable automation design through API-assisted optimization strategies.

The primary scenario required by the assessment is executed entirely via UI to simulate real user behavior from product selection through order confirmation and Order ID capture.

## 2. Assessment E2E Scenario (Primary Flow – Full UI)
The required end-to-end purchase flow is implemented as a dedicated test case:

Test Name:
`E2E UI Purchase Flow - Demoblaze`

**Automated Steps**:

1. Navigate to homepage

2. Browse product category

3. Select a product

4. Add product to cart

5. Verify cart contents (title, price, total)

6. Click “Place Order”

7. Fill checkout form

8. Submit order

9. Verify confirmation modal

10. Extract and validate Order ID

**Order ID Extraction Strategy** 

The Order ID is dynamically extracted from the confirmation modal:
```ts
    async getIdPurchase(): Promise<void> {
        const data = await this.id.innerText();
        const match = data.match(/Id:\s*(\d+)/);
        
        if (!match) {
        throw new Error ('ID not found')
        }
        
        const id = match[1];
        console.log(`Purchase ID: ${id}`);
  }
```
**Validation performed**:

- Confirmation message is displayed
- Order ID exists and is not null
- Purchase amount matches cart total

This ensures full functional validation of the UI-driven purchase flow.

### Test Execution Result

- Total Test Cases: 1 (Primary E2E Flow)
- Status: Passed
- Browser: Chromium
- Execution Mode: Parallel
- Reporting: Allure (with video & screenshots)

## 3. Advanced Optimization Strategy (API-Assisted Flow)
In addition to the required full UI flow, the framework includes an optimized API-assisted implementation for scalability. Unlike standard static testing, this framework utilizes real-time data integration:
- **External Data Fetching:** In the `setup/global_setup.ts` the framework fetches user metadata from JSONPlaceholder.
- **Environment Injection:** These fetched users are not hardcoded but are dynamically injected into the global test state, simulating a real production environment where user data is retrieved from a backend service.

Two logical roles are implemented:

**User Role (Primary – Required by Assessment)**
- Executes full UI interaction
- Validates user journey up to checkout completion

**Admin Role(Optimization Layer)**
- Uses API services to:
  - Clear cart state
  - Inject product into cart
- Focuses only on checkout validation

This hybrid strategy is designed for large regression suites where repetitive UI setup steps increase execution time.

Important:
The assessment-required flow is executed fully via UI. The API-assisted flow is implemented solely to demonstrate architectural scalability.


 
## 4. Framework Architecture
- **Custom Services (`src/services/`):** Dedicated API clients (e.g., `cartservices_api.ts`) handle backend requests to manipulate the cart state without UI overhead..
- **Page Object Model (POM)** Clean separation of page logic for maintainable tests.
- **Dependency Injection (Fixtures):** Uses Playwright Fixtures to inject Page Objects and API Services directly into test specs, keeping the code clean and modular.
- **Allure Reporting**: Rich, interactive test reports.
- **Custom Console Reporter**: Enhanced console output for test runs.
- **Parallel Execution**: Fast test runs with parallelization.
- **Global Setup Strategy:** Handles pre-test orchestration, including cleaning old results and preparing dynamic test data, ensuring a "clean slate" for every run.
 
## 5. Project Structure
```
├── tests/                # Test specifications (UI & API)
├── src/
│   ├── page_object/      # Page Object Model classes
│   ├── services/         # API service clients
│   ├── helper/           # Utilities and type definitions
│   ├── data/             # Static test data (JSON)
│   ├── config/           # API endpoint configuration
│   └── fixture.ts        # Playwright custom fixtures
├── setup/                # Global setup/teardown scripts
├── reporter/             # Custom Playwright reporter
├── allure-results/       # Allure raw results
├── test-results/         # Playwright test results
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## 6. AI Tool Usage
AI Tool Used: GitHub Copilot

Contributions of AI:

1. Generated initial Playwright configuration

2. Assisted with regex pattern for Order ID extraction

3. Suggested improvements in custom reporter structure

4. Helped refactor repetitive UI interactions into reusable methods

Pros:

  - Faster scaffolding

  - Reduced boilerplate code

  - Accelerated refactoring

Cons:

- Requires manual validation

- Occasionally suggests over-engineered solutions
  
AI improved productivity but did not replace engineering decision-making.
 
## 7. Getting Started
 
### Prerequisites
- Node.js (v18+ recommended)
- npm
 
### Installation
Install dependencies:
   ```sh
   npm install
   ```
 
### Running Tests
- Run all tests:
  ```sh
  npm run test
  ```
- Run a specific test file:
  ```sh
  npx playwright test tests/<file>.spec.ts
  ```
 
### Test Reports
- **Allure Report**: After running tests, generate and open the Allure report:
  ```sh
  npm run allure
  ```
 

## 8. Challenges & Solutions
**Challenge 1 – JavaScript Alert Handling**

Demoblaze uses native browser alerts when adding products to cart.

**Solution** :
Implemented Playwright `page.on('dialog')` handler to validate and accept alert.

**Challenge 2 – Capturing Dynamic Order ID**

Confirmation modal contains multiline formatted text.

**Solution** :
Used regex extraction and assertion validation to ensure Order ID is correctly parsed.

**Challenge 3 – Test Isolation & State Management**

Persistent cart state could cause flaky tests.

**Solution** :

Implemented clean setup strategy

Used API-assisted cart reset

**Challenge 4 – Allure Video Attachment:** 

Integrating Playwright's video recordings into the Allure Report was technically challenging due to how video paths are resolved after a test ends.

**Solution** : 

Developed a custom afterEach hook to programmatically locate the video file on the disk and attach it to the Allure report using allure-js-commons.
