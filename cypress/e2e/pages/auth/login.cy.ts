describe("visit login page of ATK", () => {
  let loginData;

  beforeEach(() => {
    cy.fixture("auth/login.json").then((data) => {
      loginData = data;
    });
  });

  const login = (email: string, password: string) => {
    cy.visit(loginData.path);
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("button").click();
  };

  const assertErrorMessage = (message) => {
    cy.get(".ant-message-notice-wrapper", { timeout: 10000 }).within(() => {
      cy.contains("span", message).should("be.visible");
    });
  };

  it("should log in successfully", () => {
    login(loginData.validUser.email, loginData.validUser.password);
  });

  it("should show error message with incorrect password", () => {
    login(loginData.invalidPassword.email, loginData.invalidPassword.password);
    assertErrorMessage(loginData.messages.incorrectPassword);
  });

  it("should show error message with account locked", () => {
    login(loginData.lockedAccount.email, loginData.lockedAccount.password);
    assertErrorMessage(loginData.messages.accountLocked);
  });
});
