/// <reference types="cypress" />

describe('Ant Design DatePicker', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inputSelector = '[data-testid="login-datepicker"]';

  it('Checks if the DatePicker is visible', () => {
    cy.get(inputSelector).should('be.visible');
  });

  // Open DatePicker, select the 15th day and verify date
  it('Selects a date in DatePicker', () => {
    cy.get(inputSelector).click({ force: true });
    cy.get('.ant-picker-cell').contains('15').click({ force: true });
    cy.get(inputSelector).should('have.value', '2025-03-15');
  });

  // Open DatePicker, select year, month, day and verify date
  it('Selects a specific month and year', () => {
    cy.get(inputSelector).click({ force: true });
    cy.get('.ant-picker-year-btn').click({ force: true });
    cy.get('.ant-picker-cell').contains('2025').click({ force: true });
    cy.get('.ant-picker-cell').contains('Mar').click({ force: true });
    cy.get('.ant-picker-cell').contains('15').click({ force: true });
    cy.get(inputSelector).should('have.value', '2025-03-15');
  });

  // Check clear the date
  it('Clears selected date', () => {
    cy.get(inputSelector).click({ force: true });
    cy.get('.ant-picker-cell').contains('20').click({ force: true });
    cy.get('.ant-picker-clear').click({ force: true });
    cy.get(inputSelector).should('have.value', '');
  });

  // Check if the DatePicker allows selection of disabled dates
  it('Disables past dates and prevents selection', () => {
    cy.get(inputSelector).click();
    cy.get('.ant-picker-cell-disabled').should('exist');
    cy.get('.ant-picker-cell-disabled').first().click({ force: true });
    cy.get(inputSelector).should('have.value', '');
  });
});
