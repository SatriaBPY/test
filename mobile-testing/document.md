# Mobile Automation Testing Documentation
## Platform: WebdriverIO Native Demo App (Android)

## 1. Setup Steps Followed
### Environment Setup
Installed Node.js (v18+)

Installed Android Studio

Configured Android SDK

Created Android Emulator (Pixel 5, API 30+)

Installed WebdriverIO Demo App APK

Started Appium service (port 4723)

### Install Dependencies
npm install

### Run Automation
npm run wdio

### Generate Report
npm run allure

## 2. Automation Configuration
### Framework:
WebdriverIO (local runner)

Appium service

Mocha framework

Allure Reporter

Video Reporter

### Execution Mode
runner: "local"

port: 4723

services: ["appium"]

### Device Capability
Current configuration targets a real device:
```sh
      "appium:platformName": "Android Emulator",
      "appium:automationName": "UiAutomator2",
      "appium:udid": "emulator-5554",
      "appium:app": path.join(process.cwd(), "./apk/android.wdio.native.app.v2.0.0.apk"),
      "appium:appPackage": "com.wdiodemoapp",
      "appium:appActivity": "com.wdiodemoapp.MainActivity",
      "appium:noReset": false,
      "appium:newCommandTimeout": 3600,
      "appium:connectHardwareKeyboard": true,
      "appium:deviceName": "Google API Emulator",
```

## 3. Element Locator Strategy Used
From login_page.ts, the following strategies are implemented:

### Accessibility ID (Primary Strategy)
Example:

$("~input-email")

$("~button-LOGIN")

This uses Accessibility ID selector, which is:

Fastest

Most stable

Recommended by Appium

Not dependent on UI hierarchy

Used for:

Login form

Input fields

Buttons

### Resource ID Selector
Example:

$("id=com.wdiodemoapp:id/alert_title")

Used for:

Alert title

Success messages

This ensures stable identification of native components.

### Android UIAutomator Selector
Example:

$('android=new UiSelector().resourceId("android:id/button1")')

Used for:

System dialog OK button

This allows direct native element targeting.

### Locator Strategy Summary
Strategy: Accessibility ID

Usage: Primary UI elements

Stability: High

Strategy: Resource ID

Usage: Alert elements

Stability: High

Strategy: UiSelector

Usage: System dialog

Stability: High

No XPath is used — this improves performance and reduces flakiness.

## 4. Test Coverage vs Requirement
### ✅ Test Case 1 – Login Flow
Requirement:

Navigate to Login

Enter credentials

Tap Login

Verify success OR error

Document behavior

Implementation:

✔ Navigate

✔ Enter test credentials

✔ Tap login

✔ Validate success message

✔ Validate logged-in message

✔ Tap OK

Status: FULLY COMPLIANT

### ✅ Test Case 2 – Forms
Requirement:

Fill text

Toggle switch

Select dropdown

Verify interactions

Implementation:

✔ Input validation

✔ Toggle ON/OFF validation

✔ Dropdown selection validation

✔ Button confirmation validation

Status: FULLY COMPLIANT

### ✅ Test Case 3 – Swipe (Bonus)
Requirement:

Swipe gesture

Verify content change

Implementation:

✔ Capture card before swipe

✔ Perform swipe

✔ Validate next card displayed

Status: BONUS COMPLETED

## 5. Reporting & Execution Evidence
The project includes:

Automatic Screenshots

In afterTest hook:

```ts
if (passed) {

  await browser.takeScreenshot();

}
```

Every passed test captures screenshot.

🎥 Video Recording

Configured in reporter:

```ts
['video', {

    outputDir: "./reports/video",

    saveAllVideos: true,

}]
```

This fulfills requirement: Screen recording OR screenshots showing test execution

Your project provides BOTH.

## 6. Test Observations
During execution:

Login success message consistently appears.

UI transitions are stable.

No flaky behavior observed.

Swipe gesture properly updates carousel state.

Toggle switch correctly reflects state changes.

No unexpected crashes detected.

## 7. AI Tools Utilized
AI Tool Used: GitHub Copilot

Used for:

WDIO configuration scaffolding

Reporter setup refinement

TypeScript typing improvements

Utility abstraction suggestions

All locator strategies and validation logic were manually defined and reviewed.

## 8. Engineering Strengths
Page Object Model architecture

No XPath usage

Explicit wait abstraction (waitForElementVisible)

Screenshot & video integration

Environment labeling in Allure

Clean session teardown