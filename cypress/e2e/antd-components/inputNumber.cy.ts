// @ts-check
/// <reference types="cypress" />

describe('Ant Design InputNumber', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // Selector for the InputNumber component
  const inputNumberSelector = '[data-testid="login-page-input-otp"]';

  // Enters a value into the InputNumber field and verifies the expected result.
  const enterValueAndVerify = (inputValue, expectedOutput) => {
    cy.get(inputNumberSelector).clear().type(`${inputValue}`).blur();
    cy.get(inputNumberSelector).should('have.value', `${expectedOutput}`);
  };

  // Clicks on the increment or decrement button and verifies the expected value.
  const clickIncrementOrDecrement = (action, expectedOutput) => {
    cy.get(inputNumberSelector)
      .closest('.ant-input-number')
      .find(`.ant-input-number-handler-${action}`)
      .click({ force: true });

    cy.get(inputNumberSelector).should('have.value', `${expectedOutput}`);
  };

  it('Should render the InputNumber component and accept valid inputs', () => {
    cy.get(inputNumberSelector).should('exist').and('be.visible');
    enterValueAndVerify(50, 50);
  });

  // Should enforce min and max value constraints (min = 1, max = 100)
  it('Should enforce min and max value constraints', () => {
    enterValueAndVerify(-10, 0);
    enterValueAndVerify(150, 100);
  });

  // Should only accept numbers
  it('Should reject non-numeric inputs', () => {
    enterValueAndVerify('abc', '');
  });

  // Action increment and decrement by 1
  it('Should correctly increment and decrement values', () => {
    enterValueAndVerify(10, 10);
    clickIncrementOrDecrement('up', 11);
    clickIncrementOrDecrement('down', 10);
  });

  // Verify default value
  it('Should retain the default value if specified', () => {
    cy.get(inputNumberSelector).should('have.value', '20');
  });

  it('Should display the correct placeholder text', () => {
    cy.get(inputNumberSelector).should('have.attr', 'placeholder', 'Enter a number');
  });
});
