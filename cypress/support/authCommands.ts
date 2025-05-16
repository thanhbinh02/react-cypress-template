import { fetchLanguageData } from './languageUtils';

declare global {
  namespace Cypress {
    interface Chainable {
      login(
        username: string,
        password: string,
        message: string,
        isSaved?: boolean
      ): Cypress.Chainable<void>;
      logout(): Cypress.Chainable<void>;
      selectCountryAndLanguage(): Cypress.Chainable<void>;
    }
  }
}

export const login = (
  username: string,
  password: string,
  message: string,
  isSaved?: boolean
) => {
  if (isSaved) {
    cy.get('#isSaved').check({ force: true });
  } else cy.get('#isSaved').uncheck({ force: true });

  const languageData = Cypress.env('languageData');

  cy.get('#username').clear().slowType(username);
  cy.get('#password').clear().slowType(password);
  cy.get("button[type='submit']").click();
  if (isSaved) {
    cy.window().its('sessionStorage.savedData').should('exist');
  }

  cy.contains(languageData?.[message]).should('be.visible');
};

export const logout = () => {
  cy.getAllLocalStorage().then((localStorageData) => {
    cy.log('LocalStorage Data:', localStorageData);
    const languageData = Cypress.env('languageData');
    cy.log('languageData Data:', languageData);
    const yesText = languageData?.['common.yes'];
    const logoutText = languageData?.['common.logout'];

    const clientInfo =
      localStorageData[Cypress.env('page')]['aqua_client_info'];
    if (clientInfo) {
      const parsedClientInfo: AquaClientInfo = JSON.parse(clientInfo as string);
      cy.log('Parsed Client Info:', parsedClientInfo);

      if (parsedClientInfo.memberName) {
        const memberName = parsedClientInfo.memberName;
        cy.log('Member Name:', memberName);

        cy.get('p.text-sm').contains(memberName).click();

        cy.get('.ant-dropdown-menu').contains(logoutText).click();

        cy.get('button.ant-btn').contains(yesText).click();

        cy.url().should('include', Cypress.env('loginPath'));
      } else {
        cy.log('No memberName in parsed client info');
      }
    } else {
      cy.log('No client info in localStorage');
    }
  });
};

export const selectCountryAndLanguage = () => {
  cy.clearLocalStorage();

  cy.get('#country').click();
  cy.get('.ant-select-dropdown .ant-select-item')
    .first()
    .click({ force: true });
  cy.get('body').click(0, 0);
  cy.wait(300);

  cy.get('#language').click();
  cy.get('.ant-select-dropdown .rc-virtual-list-holder-inner .ant-select-item')
    .contains('English')
    .click({ force: true });

  cy.get("button[type='submit']").click();

  cy.wait(200);

  fetchLanguageData();
};

interface AquaClientInfo {
  expiresIn: string;
  memberName: string;
  isShowPrice: boolean;
}

Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);
Cypress.Commands.add('selectCountryAndLanguage', selectCountryAndLanguage);
