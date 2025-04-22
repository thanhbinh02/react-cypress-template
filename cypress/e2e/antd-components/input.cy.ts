// @ts-check
/// <reference types="cypress" />

describe("Ant Design Input Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/input");
  });

  describe("Basic Input Functionality", () => {
    it("should display input and allow typing", () => {
      cy.get('.ant-input[id="basicInput"]')
        .should("be.visible")
        .type("Hello World")
        .should("have.value", "Hello World");
    });

    it("should display input with placeholder", () => {
      cy.get('.ant-input[id="basicInput"]').should(
        "have.attr",
        "placeholder",
        "Basic Input"
      );
    });

    it("should display disabled input", () => {
      cy.get('.ant-input[id="disabledInput"]')
        .should("be.visible")
        .and("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should display read-only input", () => {
      cy.get('.ant-input[id="readOnlyInput"]')
        .should("be.visible")
        .and("have.attr", "readonly");
    });
  });

  describe("Input Sizes", () => {
    it("should display large input", () => {
      cy.get('.ant-input-lg[id="largeInput"]')
        .should("be.visible")
        .and("have.class", "ant-input-lg")
        .and("have.css", "height", "40px");
    });

    it("should display medium input", () => {
      cy.get('.ant-input[id="mediumInput"]')
        .should("be.visible")
        .and("have.css", "height", "32px");
    });

    it("should display small input", () => {
      cy.get('.ant-input-sm[id="smallInput"]')
        .should("be.visible")
        .and("have.class", "ant-input-sm")
        .and("have.css", "height", "24px");
    });
  });

  describe("Input Types", () => {
    it("should display password input", () => {
      cy.get('.ant-input[id="passwordInput"]')
        .should("be.visible")
        .and("have.attr", "type", "password");
    });

    it("should display number input", () => {
      cy.get('.ant-input[id="numberInput"]')
        .should("be.visible")
        .and("have.attr", "type", "number");
    });

    it("should display email input", () => {
      cy.get('.ant-input[id="emailInput"]')
        .should("be.visible")
        .and("have.attr", "type", "email");
    });
  });

  describe("Input with Prefix/Suffix", () => {
    it("should display input with prefix", () => {
      cy.get("#prefixInput")
        .parents(".ant-input-affix-wrapper")
        .should("be.visible")
        .within(() => {
          cy.get(".ant-input-prefix").should("be.visible");
        });
    });

    it("should display input with suffix", () => {
      cy.get("#suffixInput")
        .parents(".ant-input-affix-wrapper")
        .should("be.visible")
        .within(() => {
          cy.get(".ant-input-suffix").should("be.visible");
        });
    });
  });

  describe("Input with Addon", () => {
    it("should display input with addon before", () => {
      cy.get("#addonBeforeInput")
        .parents(".ant-input-group")
        .should("be.visible")
        .within(() => {
          cy.get(".ant-input-group-addon").first().should("be.visible");
        });
    });

    it("should display input with addon after", () => {
      cy.get("#addonAfterInput")
        .parents(".ant-input-group")
        .should("be.visible")
        .within(() => {
          cy.get(".ant-input-group-addon").last().should("be.visible");
        });
    });
  });

  describe("Input Status", () => {
    it("should display input with error status", () => {
      cy.get('.ant-input-status-error[id="errorInput"]')
        .should("be.visible")
        .and("have.class", "ant-input-status-error");
    });

    it("should display input with warning status", () => {
      cy.get('.ant-input-status-warning[id="warningInput"]')
        .should("be.visible")
        .and("have.class", "ant-input-status-warning");
    });
  });

  describe("Input Interactions", () => {
    it("should clear input value when clear button is clicked", () => {
      cy.get('.ant-input[id="clearableInput"]')
        .type("Clear me")
        .get(".ant-input-clear-icon")
        .click()
        .should("have.value", "");
    });

    it("should show password when eye icon is clicked", () => {
      cy.get('.ant-input[id="passwordInput"]').as("passwordInput");
      cy.get("@passwordInput").type("password123");
      cy.get(".ant-input-password-icon").click();
      cy.get("@passwordInput").should("have.attr", "type", "text");
    });
  });
});
