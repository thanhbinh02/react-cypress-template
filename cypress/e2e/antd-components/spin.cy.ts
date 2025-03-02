// @ts-check
/// <reference types="cypress" />

describe('Ant Design Spin', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inputSelectors = {
    spin: '[data-testid="login-loading-spinner"]',
    simulateLoadingBtn: '[data-testid="simulate-loading-btn"]',
  };

  it('Displays Spin when clicking simulate loading button', () => {
    cy.get(inputSelectors.simulateLoadingBtn).click();
    cy.get(inputSelectors.spin).should('be.visible');
  });

  it('Hides Spin after loading is completed', () => {
    cy.get(inputSelectors.simulateLoadingBtn).click();

    cy.get(inputSelectors.spin).should('be.visible').and('have.attr', 'aria-busy', 'true');

    cy.wait(2000);

    cy.get(inputSelectors.spin).should('not.have.attr', 'aria-busy', 'true');
  });
});
