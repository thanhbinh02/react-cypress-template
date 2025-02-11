/// <reference types="cypress" />

describe("Ant Design Select", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Mode single
  it("should open dropdown when clicking select", () => {
    cy.get('.ant-select-selection-search-input[id="keyOfFieldForm"]')
      .should("exist") // Use exist, not be.visible, because the element is hidden
      .click({ force: true }); // Use force in case it's hidden

    cy.get(".ant-select-dropdown")
      .should("exist") // Ensure it exists
      .and("be.visible"); // Ensure it is actually visible

    cy.get(".ant-select-item-option-content")
      .contains("Option to be selected") // Find the option by its text
      .click();
  });

  it("should display the default selected value in single select mode", () => {
    cy.get("#keyOfFieldForm")
      .closest(".ant-select-selector")
      .contains(".ant-select-selection-item", "Default value")
      .should("exist");
  });

  // Mode multiple
  it("should allow selecting multiple options", () => {
    const optionsToSelect = ["Option 1", "Option 2"];

    cy.get('.ant-select-selection-search-input[id="keyOfFieldForm"]')
      .should("exist")
      .click({ force: true });

    cy.wrap(optionsToSelect).each((option) => {
      cy.get(".ant-select-item-option-content").contains(`${option}`).click();
    });
  });

  it("should display all default selected values in multiple select mode", () => {
    const selectedValues = ["Option 1", "Option 2"];

    cy.wrap(selectedValues).each((value) => {
      cy.get("#keyOfFieldForm")
        .closest(".ant-select-selector")
        .find(".ant-select-selection-item-content")
        .contains(`${value}`)
        .should("exist");
    });
  });

  // Mode tags
  it("should allow entering a value and create a tag in tags mode", () => {
    cy.get('.ant-select-selection-search-input[id="keyOfFieldForm"]')
      .should("be.visible")
      .type("Value")
      .should("have.value", "Value");
  });

  it("should display all default selected values in tags select mode", () => {
    const selectedValues = ["Option 1", "Option 2"];

    cy.wrap(selectedValues).each((value) => {
      cy.get("#keyOfFieldForm")
        .closest(".ant-select-selector")
        .find(".ant-select-selection-item-content")
        .contains(`${value}`)
        .should("exist");
    });
  });

  // Clear
  it("should clear the selected value", () => {
    cy.get("#keyOfFieldForm")
      .closest(".ant-select")
      .should("exist")
      .within(() => {
        cy.get(".ant-select-clear").should("exist").click();
      });
  });

  // Check disabled
  it("should be disabled", () => {
    cy.get("#keyOfFieldForm").should("be.disabled");
  });
});
