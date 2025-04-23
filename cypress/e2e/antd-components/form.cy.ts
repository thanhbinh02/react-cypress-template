/// <reference types="cypress" />

let formData;

before(() => {
  cy.fixture("form-data.json").then((data) => {
    formData = data;
  });
});

describe("AntD Form", () => {
  beforeEach(() => {
    cy.visit(formData.path);
  });

  const handleSubmit = (data: {
    note: string;
    age: string;
    gender: number;
  }) => {
    const { genders } = formData;

    cy.get("#note").clear().type(data.note);

    cy.get("#gender").click();
    cy.get(".ant-select-dropdown")
      .contains(genders[data.gender.toString()])
      .click();

    cy.get(`input[type="radio"][value="${data.age}"]`).check({ force: true });

    cy.get("button[type='submit']").click();
  };

  it("should render the form with all fields and buttons", () => {
    formData.fields.forEach((field) => {
      const selector = `#${formData.nameForm ? `${formData.nameForm}_` : ""}${
        field.name
      }`;

      cy.get(selector).should("exist");

      if (field.required) {
        cy.get(selector)
          .parents(".ant-form-item")
          .find("label.ant-form-item-required")
          .should("exist");
      }
    });

    formData.buttons.forEach((button) => {
      cy.get("button").contains(button.text).should("be.visible");
    });
  });

  it("should auto-fill the form with provided data when Fill form button is clicked", () => {
    cy.get("button").contains("Fill form").click();

    formData.fields.forEach((field) => {
      const id = `#${formData.nameForm ? `${formData.nameForm}_` : ""}${
        field.name
      }`;
      const expectedValue = field.initialValue;

      if (field.name === "gender") {
        cy.get(".ant-select-selection-item").should(
          "have.text",
          formData.genders[expectedValue]
        );
      } else if (field.name === "age") {
        cy.get(`input[type="radio"][value="${expectedValue}"]`).should(
          "be.checked"
        );
      } else {
        cy.get(id).should("have.value", expectedValue);
      }
    });
  });

  it("should submit the form with correct values from submitData", () => {
    handleSubmit(formData.submitData);
  });
});
