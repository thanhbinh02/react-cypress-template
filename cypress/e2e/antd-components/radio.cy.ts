describe("Ant Design Radio", () => {
  it("Displays the Radio buttons and allows selection", () => {
    cy.get('.ant-radio-group[id="keyOfFieldForm"]')
      .should("exist")
      .within(() => {
        cy.get(`[value="selectedOption"]`)
          .first()
          .click({ force: true })
          .should("be.checked");
      });
  });

  it("Ensures only one Radio button can be selected", () => {
    cy.get('.ant-radio-group[id="keyOfFieldForm"]')
      .find(`.ant-radio-input[value="option1"]`)
      .check({ force: true });

    cy.get('.ant-radio-group[id="keyOfFieldForm"]')
      .find(`.ant-radio-input[value="option2"]`)
      .check({ force: true });

    cy.get('.ant-radio-group[id="keyOfFieldForm"]')
      .find(`.ant-radio-input[value="option1"]`)
      .should("not.be.checked");

    cy.get('.ant-radio-group[id="keyOfFieldForm"]')
      .find(`.ant-radio-input[value="option2"]`)
      .should("be.checked");
  });

  it("Verifies that the Radio is disabled", () => {
    cy.get('.ant-radio-group[id="keyOfFieldForm"]')
      .find(`.ant-radio-input[value="option1"]`)
      .should("be.disabled");
  });

  it("Tests if the disabled Radio button cannot be selected", () => {
    cy.get('.ant-radio-group[id="keyOfFieldForm"]')
      .find(`.ant-radio-input[value="disabledOption"]`)
      .should("be.disabled")
      .check({ force: true })
      .should("not.be.checked");
  });
});
