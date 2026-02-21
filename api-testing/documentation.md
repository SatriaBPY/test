# API Testing Documentation – JSONPlaceholder

## Platform Under Test

- **API Service:** JSONPlaceholder
- **Testing Tool:** Postman
- **CLI Execution:** Newman
- **Reporting:** `newman-reporter-htmlextra` (HTML Dashboard)

---

## 1. Overview

This project validates REST API functionality through automated positive and negative test scenarios.

The primary objective is to ensure:
- Correct HTTP status codes
- Proper response structure
- Data integrity and type validation
- Proper error handling for invalid requests

The tests were developed in Postman and executed via Newman CLI to simulate CI/CD-compatible automation.

---

## 2. Test Scope & Coverage

The following endpoints were tested:

- `GET /posts`
- `GET /posts/{id}`
- `POST /posts`
- `PUT /posts/{id}`
- `DELETE /posts/{id}`
- `GET /comments`

Both positive and negative scenarios were implemented as required by the assessment.

---

## 3. Test Strategy

The testing approach includes:

### Positive Testing
- Valid requests with correct payload and valid resource IDs.
- Validation performed:
  - HTTP status code verification
  - Response body validation
  - Data type verification (Number, String, Array)
  - Schema structure consistency

### Negative Testing
- Invalid or malformed requests designed to test API robustness.
- Scenarios include:
  - Empty request body
  - Invalid data type
  - Non-existent resource ID
  - Invalid payload structure

Each test uses Postman scripting (`pm.*`) for assertion logic.

---

## 4. Example Test Cases (Expected vs Actual)

### ✅ Positive Case – Create Post

- **Endpoint:** `POST /posts`
- **Scenario:** Create a new post with valid payload

**Expected Result:**
- Status Code: `201 Created`
- Response contains:
  - `id` (Number)
  - `title` (String)
  - `body` (String)
  - `userId` (Number)

**Actual Result:**
- Status Code: `201`
- Response structure valid
- Data types verified correctly

**Result:** PASS

---

### ❌ Negative Case – Empty Body

- **Endpoint:** `POST /posts`
- **Scenario:** Send empty request body

**Expected Result:**
- Status Code: `400 Bad Request`
- Error message returned

**Actual Result:**
- Status Code: `201`
- Resource created successfully

**Result:** FAIL

**Finding:** API does not validate empty payload (Potential design limitation of mock API)

---

### ❌ Negative Case – Invalid Data Type

- **Endpoint:** `POST /posts`
- **Scenario:** Send string instead of numeric `userId`

**Expected Result:**
- Status Code: `400`
- Validation error message

**Actual Result:**
- Status Code: `201`
- Resource accepted without validation

**Result:** FAIL

**Finding:** No strict type validation implemented

---

### ✅ Positive Case – Get All Posts

- **Endpoint:** `GET /posts`

**Expected Result:**
- Status Code: `200`
- Response is an array
- Array length > 0
- Each object contains required keys

**Actual Result:**
- Status Code: `200`
- Returned 100 items
- Structure valid

**Result:** PASS

---

## 5. Test Execution Summary

- **Total Test Cases Executed:** 10
- **Passed:** 8
- **Failed:** 2

The failed cases indicate missing validation mechanisms rather than automation errors.

An interactive HTML report was generated using Newman for detailed visibility of execution results.

---

## 6. Environment Configuration

- **File:** `environment/env.json`
- **Variables defined:**
  - `base_url`
  - `post_id`
  - `user_id`
  - `invalidPostId`

Dynamic values are injected via Pre-request scripts to prevent data collision during repeated executions.

---

## 7. Technical Stack & Automation Design

- Postman Collection for test logic
- Newman CLI for automated execution
- HTML reporting via `newman-reporter-htmlextra`
- npm scripts for streamlined execution

**Commands:**
```bash
npm run start
npm run serve
```

## Project Structure

api-testing/
│
├── collection/
│   └── task.json           # Postman collection with test cases
│
├── environment/
│   └── env.json            # Postman environment variables
│
├── reporter/
│   └── (report.html)       # Generated test report (created after running tests)
│
├── package.json            # Project metadata and scripts
├── package-lock.json       # Dependency lock file
└── node_modules/           # Project dependencies




## Test Execution Results

Total Tests Executed: 10 Case(s)
Status: 8 PASSED | 2 FAILED (Potential Bugs Found)

### Detailed Test Results
| Category | TC ID | Scenario | Status | Remarks |
| :--- | :--- | :--- | :--- | :--- |
| **NEGATIVE** | TC-007 | Invalid Data Post | ✅ PASS | Correctly handled |
| **NEGATIVE** | TC-008 | Empty Body | ❌ FAIL | **Bug**: API returns 201 instead of 400 |
| **NEGATIVE** | TC-009 | Invalid Body Type | ❌ FAIL | **Bug**: No type validation (accepted strings as integers) |
| **NEGATIVE** | TC-010 | Update Non-existent | ✅ PASS | Correctly handled |
| **POSITIVE** | TC-004 | Create Post | ✅ PASS | Resource created successfully |
| **POSITIVE** | TC-005 | Update Post | ✅ PASS | Data updated correctly |
| **POSITIVE** | TC-001 | Get All Posts | ✅ PASS | Returned 100 items |
| **POSITIVE** | TC-006 | Delete Post | ✅ PASS | Status 200 OK |
| **POSITIVE** | TC-003 | Single Comments | ✅ PASS | Relationship data verified |
| **POSITIVE** | TC-002 | Single Posts | ✅ PASS | Data integrity verified |

---

## AI Tool Usage
AI Tool Used: GitHub Copilot

**AI contributions** :

- Assisted in optimizing Postman test scripts
- Suggested efficient loop structures for validating large arrays
- Helped generate dynamic payload logic using Math.random()
- Aided in identifying negative scenarios such as:
  - Empty payload
  - Type mismatch
  - Non-existent resource

AI accelerated script development but all validation logic and expected behavior definitions were determined manually.