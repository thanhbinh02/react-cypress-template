// @ts-check
/// <reference types="cypress" />

describe("Ant Design Card - CardShowcasePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/card");
  });

  it("should render the basic card", () => {
    cy.get(".ant-card").should("exist");
    cy.get(".ant-card-head-title").should("contain", "Card Title");
    cy.get(".ant-card-body").should(
      "contain",
      "This is the content of the card."
    );
  });

  it("should render card with image cover", () => {
    cy.get(".ant-card-cover img")
      .should("have.attr", "src")
      .and("include", "https://");
  });

  it("should render card with actions", () => {
    cy.get(".ant-card-actions").should("exist");
    cy.get(".ant-card-actions > li").should("have.length", 3);
  });

  it("should respond to clicking an action", () => {
    cy.get(".ant-card-actions > li").first().click();
    cy.get("#actionResult").should("contain", "Action 1 clicked");
  });
});
