/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Import commands.js using ES2015 syntax:
import './commands';
import './authCommands';
import 'cypress-file-upload';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add(
  'typeAndBlur',
  { prevSubject: 'element' },
  (subject, value: string) => {
    cy.wrap(subject).clear().type(value).blur();
  }
);

Cypress.Commands.add(
  'shouldHaveValue',
  { prevSubject: 'element' },
  (
    subject,
    expectedValue: string | number,
    matcher: keyof Chai.Assertion | undefined = 'value'
  ) => {
    cy.wrap(subject).should(`have.${matcher}`, expectedValue);
  }
);

Cypress.Commands.add('submitForm', () => {
  cy.get('body').click(0, 0);
  cy.contains('button', 'Save').click();

  cy.get('.ant-popconfirm').within(() => {
    cy.contains('button', 'Agree').click();
  });
});

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
