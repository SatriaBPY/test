import { driver } from "@wdio/globals";
import { ChainablePromiseElement } from "webdriverio";

const MEDIUM_WAIT = 5000;
//const LONG_TIMEOUT = 10000;
const SHORT_WAIT = 1000;

/*
----------------------------
FOR HIDE KEYBOARD
-----------------------------
*/
export const hideKeyboard = async (): Promise<void> => {
  if (await driver.isKeyboardShown()) {
    await driver.hideKeyboard();
  }
};

/*
----------------------------
FOR WAIT ELEMENT DISPLAYED
-----------------------------
*/
export const waitForElementVisible = async (
  element: ChainablePromiseElement,
  timeout = MEDIUM_WAIT,
): Promise<void> => {
  await element.waitForDisplayed({
    timeout,
    interval: SHORT_WAIT,
  });
};


export const scrollIfNeeded = async (
  element: ChainablePromiseElement,
  timeout: number = MEDIUM_WAIT,
): Promise<void> => {
  await element.waitForDisplayed({
    timeout: timeout,
    timeoutMsg: `Element ${element.selector} is not clickable after ${timeout}ms`,
    interval: SHORT_WAIT,
  });
  await element.scrollIntoView();
};

/*
----------------------------
FOR CLICK ELEMENT
-----------------------------
*/
export const tap = async (
  element: ChainablePromiseElement,
  timeout: number = MEDIUM_WAIT,
): Promise<void> => {
  await element.waitForDisplayed({
    timeout: timeout,
    timeoutMsg: `Element ${element.selector} is not displayed after ${timeout}ms`,
    interval: SHORT_WAIT,
  });
  await element.click();
};

/*
----------------------------
FOR FILL FIELD
-----------------------------
*/

export const fill = async (
  element: ChainablePromiseElement,
  value: string,
  timeout: number = MEDIUM_WAIT,
): Promise<void> => {
  await element.waitForDisplayed({
    timeout: timeout,
    timeoutMsg: `Element ${element.selector} is not displayed after ${timeout}ms`,
    interval: SHORT_WAIT,
  });
  await element.setValue(value);
};

/*
----------------------------
FOR SWIPE SIMULATION
-----------------------------
*/

export const swipe = async (
  direction: string = "up",
): Promise<void> => {
  const { width, height } = await driver.getWindowSize();
  let startX: number, startY: number, endX: number, endY: number;
  
  switch (direction) {
    case "up":
      startX = width / 2;
      startY = height * 0.8;
      endX = width / 2;
      endY = height * 0.2;
      break;
    case "down":
      startX = width / 2;
      startY = height * 0.2;
      endX = width / 2;
      endY = height * 0.8;
      break;
    case "left":
      startX = width * 0.8;
      startY = height / 2;
      endX = width * 0.2;
      endY = height / 2;
      break;
    case "right":
      startX = width * 0.2;
      startY = height / 2;
      endX = width * 0.8;
      endY = height / 2;
      break;
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }

  await driver.action('pointer', {
    parameters: { pointerType: 'touch' }
  })
  .move({ duration: 0, x: Math.floor(startX), y: Math.floor(startY) })
  .down({ button: 0 }) 
  .pause(500)         
  .move({ duration: 1000, x: Math.floor(endX), y: Math.floor(endY) })
  .up({ button: 0 }) 
  .perform();
};
