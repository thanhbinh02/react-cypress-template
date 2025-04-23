// @ts-check
/// <reference types="cypress" />

describe("Ant Design Switch - SwitchShowcasePage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/switch");
  });

  it("should render the switches", () => {
    cy.get("#mainSwitch").should("exist");
    cy.get("#disabledSwitch").should("exist");
  });

  it("should toggle the switch on", () => {
    cy.get("#mainSwitch").click();
    cy.get("#mainSwitch").should("have.class", "ant-switch-checked");
  });

  it("should toggle the switch off", () => {
    cy.get("#mainSwitch").click(); // turn on
    cy.get("#mainSwitch").click(); // turn off
    cy.get("#mainSwitch").should("not.have.class", "ant-switch-checked");
  });

  it("should reflect checked state in text", () => {
    cy.get("#switchStatus").should("contain", "OFF");
    cy.get("#mainSwitch").click();
    cy.get("#switchStatus").should("contain", "ON");
  });

  it("should be disabled when set", () => {
    cy.get("#disabledSwitch").should("have.class", "ant-switch-disabled");
    cy.get("#disabledSwitch").click({ force: true });
    cy.get("#disabledSwitch").should("not.have.class", "ant-switch-checked");
  });
});
