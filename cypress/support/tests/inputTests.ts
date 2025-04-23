// @ts-check
/// <reference types="cypress" />

/**
 * @typedef {{
 *   id: string,
 *   placeholder?: string,
 *   disabled?: boolean,
 *   readOnly?: boolean,
 *   size?: "large" | "medium" | "small",
 *   type?: string
 * }} InputTestConfig
 */

/**
 * @param {{
 *   props: InputTestConfig
 * }} options
 */
// inputTests.ts

export function runInputTests({ props }) {
  const { id, placeholder } = props;

  it("should display input and allow typing", () => {
    cy.get(id)
      .should("be.visible")
      .type("Hello World")
      .should("have.value", "Hello World");
  });

  if (placeholder) {
    it(`should have placeholder "${placeholder}"`, () => {
      cy.get(id).should("have.attr", "placeholder", placeholder);
    });
  }
}
