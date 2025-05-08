import { fetchLanguageData } from 'cypress/support/languageUtils';
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
    });
  });

  const login = (
    username: string,
    password: string,
    message: string,
    isSaved?: boolean
  ) => {
    if (isSaved) {
      cy.get('#isSaved').check({ force: true });
    } else cy.get('#isSaved').uncheck({ force: true });

    const languageData = Cypress.env('languageData');

    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get("button[type='submit']").click();

    if (isSaved) {
      cy.window().its('sessionStorage.savedData').should('exist');
    }

    cy.contains(languageData?.[message]).should('be.visible');
  };

  const logout = () => {
    cy.getAllLocalStorage().then((localStorageData) => {
      cy.log('LocalStorage Data:', localStorageData);
      const languageData = Cypress.env('languageData');
      cy.log('languageData Data:', languageData);
      const yesText = languageData?.['common.yes'];
      const logoutText = languageData?.['common.logout'];

      const clientInfo = localStorageData[loginData.page]['aqua_client_info'];
      if (clientInfo) {
        const parsedClientInfo: AquaClientInfo = JSON.parse(
          clientInfo as string
        );
        cy.log('Parsed Client Info:', parsedClientInfo);

        if (parsedClientInfo.memberName) {
          const memberName = parsedClientInfo.memberName;
          cy.log('Member Name:', memberName);

          cy.get('p.text-sm').contains(memberName).click();

          cy.get('.ant-dropdown-menu').contains(logoutText).click();

          cy.get('button.ant-btn').contains(yesText).click();

          cy.url().should('include', loginData.loginPath);
        } else {
          cy.log('No memberName in parsed client info');
        }
      } else {
        cy.log('No client info in localStorage');
      }
    });
  };

  const selectCountryAndLanguage = () => {
    cy.clearLocalStorage();

    cy.get('#country').click();
    cy.get('.ant-select-dropdown .ant-select-item')
      .first()
      .click({ force: true });
    cy.get('body').click(0, 0);
    cy.wait(300);

    cy.get('#language').click();
    cy.get(
      '.ant-select-dropdown .rc-virtual-list-holder-inner .ant-select-item'
    )
      .contains('English')
      .click({ force: true });

    cy.get("button[type='submit']").click();

    cy.wait(200);

    fetchLanguageData();
  };

  beforeEach(() => {
    cy.visit(`${loginData.page}${loginData.loginPath}`);
    selectCountryAndLanguage();
    cy.get('#username').should('be.visible');
  });

  it('Login with correct credentials', () => {
    login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message
    );

    logout();
  });

  it('Login with incorrect password', () => {
    login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password,
      loginData.invalidPassword.message
    );
  });

  it('Login with locked account', () => {
    login(
      loginData.lockedAccount.username,
      loginData.lockedAccount.password,
      loginData.lockedAccount.message
    );
  });

  it('should login and remember user credentials when "Remember Me" is checked', () => {
    login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message,
      true
    );

    logout();
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
    login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message,
      false
    );

    logout();
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
    login(
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
    login(
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
    selectCountryAndLanguage();

    login(
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

interface AquaClientInfo {
  expiresIn: string;
  memberName: string;
  isShowPrice: boolean;
}
