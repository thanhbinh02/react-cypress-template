/// <reference types="cypress" />
import './commands'; // Import custom commands file

declare global {
  namespace Cypress {
    interface Chainable {
      typeAndBlur(value: string): Chainable<JQuery<HTMLElement>>;
      shouldHaveValue(
        expectedValue: string | number,
        matcher?: keyof Chai.Assertion
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// 👇 Phải export 1 dòng gì đó để không bị lỗi isolatedModules
export {};
