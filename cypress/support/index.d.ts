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
      submitForm(submitText?: string, confirmText?: string): Chainable<void>;
      cancelForm(): Chainable<void>;
      selectOption(selectId: string, optionIndex: number): Chainable<void>;
      selectDate(
        selector: string,
        options: {
          day?: string;
          month?: string;
          year?: string;
        }
      ): Chainable<void>;
    }
  }
}

export {};
