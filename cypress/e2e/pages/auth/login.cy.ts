import { fetchLanguageData } from "cypress/support/languageUtils";
import "../../../support/commands";
/// <reference types="cypress" />

describe("Login Flow", () => {
  let loginData: {
    page: string;
    loginPath: string;
    validUser: { username: string; password: string; message: string };
    invalidPassword: { username: string; password: string; message: string };
    lockedAccount: { username: string; password: string; message: string };
  };

  before(() => {
    cy.fixture("auth/login.json").then((data) => {
      loginData = data;
    });
  });

  const login = (username: string, password: string, message: string) => {
    const languageData = Cypress.env("languageData");

    cy.get("#username").clear().type(username);
    cy.get("#password").clear().type(password);
    cy.get("button[type='submit']").click();

    cy.contains(languageData?.[message]).should("be.visible");
  };

  const logout = () => {
    cy.getAllLocalStorage().then((localStorageData) => {
      cy.log("LocalStorage Data:", localStorageData);
      const languageData = Cypress.env("languageData");
      cy.log("languageData Data:", languageData);
      const yesText = languageData?.["common.yes"];
      const logoutText = languageData?.["common.logout"];

      const clientInfo = localStorageData[loginData.page]["aqua_client_info"];
      if (clientInfo) {
        const parsedClientInfo: AquaClientInfo = JSON.parse(
          clientInfo as string
        );
        cy.log("Parsed Client Info:", parsedClientInfo);

        if (parsedClientInfo.memberName) {
          const memberName = parsedClientInfo.memberName;
          cy.log("Member Name:", memberName);

          cy.get("p.text-sm").contains(memberName).click();

          cy.get(".ant-dropdown-menu").contains(logoutText).click();

          cy.get("button.ant-btn").contains(yesText).click();

          cy.url().should("include", loginData.loginPath);
        } else {
          cy.log("No memberName in parsed client info");
        }
      } else {
        cy.log("No client info in localStorage");
      }
    });
  };

  beforeEach(() => {
    cy.visit(`${loginData.page}${loginData.loginPath}`);
    selectCountryAndLanguage();
    cy.get("#username").should("be.visible");
  });

  it("Login with correct credentials", () => {
    login(
      loginData.validUser.username,
      loginData.validUser.password,
      loginData.validUser.message
    );

    logout();
  });

  it("Login with incorrect password", () => {
    login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password,
      loginData.invalidPassword.message
    );
  });

  it("Login with locked account", () => {
    login(
      loginData.lockedAccount.username,
      loginData.lockedAccount.password,
      loginData.lockedAccount.message
    );
  });
});

interface AquaClientInfo {
  expiresIn: string;
  memberName: string;
  isShowPrice: boolean;
}
