describe("Ant Design Input", () => {
  it("Displays the Input and allows typing", () => {
    cy.get('.ant-input[id="keyOfFieldForm"]')
      .should("be.visible")
      .type("Hello, Thanh Binh!")
      .should("have.value", "Hello, Thanh Binh!");
  });

  // Verify placeholder
  it("Checks the placeholder text", () => {
    cy.get('.ant-input[id="keyOfFieldForm"]').should(
      "have.attr",
      "placeholder",
      "Enter text..."
    );
  });

  // Ensure the Input is disabled
  it("Verifies that the Input is disabled", () => {
    cy.get('.ant-input[id="keyOfFieldForm"]').should("be.disabled");
  });
});
