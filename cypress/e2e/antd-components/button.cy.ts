// @ts-check
/// <reference types="cypress" />

describe("Ant Design Button", () => {
  const BUTTON_CLASSNAMES = {
    defaultType: ".ant-btn-default",
    primary: ".ant-btn-primary",
    dashed: ".ant-btn-dashed",
    text: ".ant-btn-text",
    link: ".ant-btn-link",
    dangerous: ".ant-btn-dangerous",
    ghost: ".ant-btn-background-ghost",
  };

  const classNames = "";

  // Example for primary and dangerous
  it("Checks if the button is visible and has correct text and type", () => {
    cy.contains(
      `.ant-btn${BUTTON_CLASSNAMES.dangerous}${BUTTON_CLASSNAMES.primary}`,
      "Button text"
    )
      .should("be.visible")
      .click();
  });

  // Check disabled
  it("Checks if the button is disabled", () => {
    cy.contains(classNames, "Button text").should("be.disabled");
  });

  // Check contains an icon
  it("Checks if the button contains an icon", () => {
    cy.get(classNames).within(() => {
      cy.get(".ant-btn-icon").should("be.visible");
    });
  });

  // Check loading
  it("Checks if the button has loading state", () => {
    cy.contains(`${classNames}.ant-btn-loading`, "Button text").should(
      "be.visible"
    );
  });
});
