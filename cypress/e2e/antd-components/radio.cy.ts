// @ts-check
/// <reference types="cypress" />

describe("Ant Design Radio - RadioShowcasePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/radio"); // URL to RadioShowcasePage
  });

  it("should render all radio buttons", () => {
    cy.get("#exampleRadioGroup")
      .find(".ant-radio-wrapper")
      .should("have.length", 3);
  });

  it("should allow selecting a radio option", () => {
    cy.get("#exampleRadioGroup").contains("Option 2").click();

    cy.get('#exampleRadioGroup input[value="option2"]').should("be.checked");
  });

  it("should only allow one option to be selected", () => {
    cy.get("#exampleRadioGroup").contains("Option 1").click();
    cy.get("#exampleRadioGroup").contains("Option 2").click();

    cy.get('#exampleRadioGroup input[value="option1"]').should(
      "not.be.checked"
    );
    cy.get('#exampleRadioGroup input[value="option2"]').should("be.checked");
  });

  it("should not allow selecting a disabled radio", () => {
    cy.get('#exampleRadioGroup input[value="option3"]').should("be.disabled");

    cy.get("#exampleRadioGroup").contains("Option 3").click({ force: true });

    cy.get('#exampleRadioGroup input[value="option3"]').should(
      "not.be.checked"
    );
  });

  it("should have correct labels for each radio", () => {
    cy.get("#exampleRadioGroup .ant-radio-wrapper")
      .eq(0)
      .should("contain.text", "Option 1");
    cy.get("#exampleRadioGroup .ant-radio-wrapper")
      .eq(1)
      .should("contain.text", "Option 2");
    cy.get("#exampleRadioGroup .ant-radio-wrapper")
      .eq(2)
      .should("contain.text", "Option 3 (Disabled)");
  });
});
