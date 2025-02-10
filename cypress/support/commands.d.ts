/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login and visit a page
     * @example cy.loginAndVisit('user@email.com', 'password123', '/pickup-points/add')
     */
    loginAndVisit(
      email: string,
      password: string,
      visitUrl: string
    ): Chainable<void>;
  }
}
