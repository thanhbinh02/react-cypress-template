import '../../../support/commands';
/// <reference types="cypress" />

describe('Login Flow', () => {
  let loginData: {
    page: string;
    loginPath: string;
    validUser: { username: string; password: string; message: string };
    invalidPassword: { username: string; password: string; message: string };
    lockedAccount: { username: string; password: string; message: string };
  };

  before(() => {
    cy.fixture('auth/login.json').then((data) => {
      loginData = data;
      Cypress.env('page', data.page);
      Cypress.env('loginPath', data.loginPath);
    });
  });

  beforeEach(() => {
    cy.visit(`${loginData.page}${loginData.loginPath}`);
    cy.selectCountryAndLanguage();
    cy.get('#username').should('be.visible');
  });

  it('Login with correct credentials', () => {
    cy.login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message
    );

    cy.logout();
  });

  it('Login with incorrect password', () => {
    cy.login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password,
      loginData.invalidPassword.message
    );
  });

  it('Login with locked account', () => {
    cy.login(
      loginData.lockedAccount.username,
      loginData.lockedAccount.password,
      loginData.lockedAccount.message
    );
  });

  it('should login and remember user credentials when "Remember Me" is checked', () => {
    cy.login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message,
      true
    );

    cy.logout();
    cy.get('#isSaved').should('be.checked');
    cy.window()
      .its('sessionStorage')
      .invoke('getItem', 'savedData')
      .should('not.be.null')
      .then((savedData) => {
        const data = JSON.parse(savedData as string);
        expect(data.isSaved).to.equal(true);
      });
  });

  it('should login and not remember user credentials when "Remember Me" is unchecked', () => {
    cy.login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message,
      false
    );

    cy.logout();
    cy.get('#isSaved').should('not.be.checked');
    cy.window()
      .its('sessionStorage')
      .invoke('getItem', 'savedData')
      .should('not.be.null')
      .then((savedData) => {
        const data = JSON.parse(savedData as string);
        expect(data.isSaved).to.equal(false);
      });
  });

  it('Keep "Remember Me" checked, and reflect state in sessionStorage on failed login (incorrect password)', () => {
    cy.login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password,
      loginData.invalidPassword.message,
      true
    );

    cy.window()
      .its('sessionStorage')
      .invoke('getItem', 'savedData')
      .should('not.be.null')
      .then((savedData) => {
        const data = JSON.parse(savedData as string);
        expect(data.isSaved).to.equal(true);
      });
  });

  it('Keep "Remember Me" checked, and reflect state in sessionStorage on failed login (locked account)', () => {
    cy.login(
      loginData.lockedAccount.username,
      loginData.lockedAccount.password,
      loginData.lockedAccount.message,
      true
    );

    cy.window()
      .its('sessionStorage')
      .invoke('getItem', 'savedData')
      .should('not.be.null')
      .then((savedData) => {
        const data = JSON.parse(savedData as string);
        expect(data.isSaved).to.equal(true);
      });
  });

  it('should override sessionStorage isSaved: true if checkbox is manually unchecked before login', () => {
    cy.window().then((win) => {
      win.sessionStorage.setItem(
        'savedData',
        JSON.stringify({ isSaved: true })
      );
    });

    cy.visit(`${loginData.page}${loginData.loginPath}`);
    cy.selectCountryAndLanguage();

    cy.login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message,
      false
    );

    cy.window()
      .its('sessionStorage')
      .invoke('getItem', 'savedData')
      .should('not.be.null')
      .then((savedData) => {
        const data = JSON.parse(savedData as string);
        expect(data.isSaved).to.equal(false);
      });
  });
});
