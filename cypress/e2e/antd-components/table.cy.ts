/// <reference types="cypress" />

describe('Ant Design Table', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inputSelector = '[data-testid="login-table"]';

  // Verify that the table exists
  it('Checks if the table is displayed correctly', () => {
    cy.get(inputSelector).should('be.visible');
  });

  // Verify the number of data rows and columns
  it('Checks the number of rows and columns in the table', () => {
    cy.get(`${inputSelector} tbody tr`).should('have.length', 10);
    cy.get(`${inputSelector} thead tr th`).should('have.length', 3);
  });

  it('Checks the table data content', () => {
    cy.get(`${inputSelector} tbody tr`)
      .eq(0)
      .within(() => {
        cy.get('td').eq(0).should('contain', '1');
        cy.get('td').eq(1).should('contain', 'John Doe');
        cy.get('td').eq(2).should('contain', 'john@example.com');
      });

    cy.get(`${inputSelector} tbody tr`)
      .eq(1)
      .within(() => {
        cy.get('td').eq(0).should('contain', '2');
        cy.get('td').eq(1).should('contain', 'Jane Smith');
        cy.get('td').eq(2).should('contain', 'jane@example.com');
      });
  });

  it('Checks table pagination navigation', () => {
    cy.get('.ant-pagination-item').contains('3').click();
    cy.get(`${inputSelector} tbody tr`).should('exist');
  });
});
