import { generateFormItemSelector } from "../../support/formTestUtils";
import { checkInputProps } from "../../support/inputTestUtils";
import { checkSelectProps } from "../../support/selectTestUtils";

interface Field {
  name: string;
  required: boolean;
  initialValue: string | number;
  type: "input" | "select" | "radio";
  props?: Record<string, unknown>;
}

interface FormData {
  path: string;
  nameForm: string;
  fields: Record<string, Field>;
  genders: Record<string, string>;
  submitData: { note: string; age: string; gender: number };
  buttons: Array<{ text: string }>;
}

let formData: FormData;

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
    Object.values(formData.fields).forEach((field: Field) => {
      const selector = generateFormItemSelector(formData.nameForm, field.name);

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

  it("should validate note input props", () => {
    const { name, props } = formData.fields.note;
    const selector = generateFormItemSelector(formData.nameForm, name);
    cy.get(selector).should("be.visible");
    checkInputProps(selector, props);
  });

  it("should validate gender select gender", () => {
    const { name, props } = formData.fields.gender;
    const selector = generateFormItemSelector(formData.nameForm, name);

    checkSelectProps(selector, props);
  });

  it("should auto-fill the form with provided data when Fill form button is clicked", () => {
    cy.get("button").contains("Fill form").click();

    Object.values(formData.fields).forEach((field: Field) => {
      const id = generateFormItemSelector(formData.nameForm, field.name);
      const expectedValue = field.initialValue;

      if (field.type === "select") {
        cy.get(".ant-select-selection-item").should(
          "have.text",
          formData.genders[expectedValue as string]
        );
      } else if (field.type === "radio") {
        cy.get(`input[type="radio"][value="${expectedValue}"]`).should(
          "be.checked"
        );
      } else if (field.type === "input") {
        cy.get(id).should("have.value", expectedValue);
      }
    });
  });

  it("should submit the form with correct values from submitData", () => {
    handleSubmit(formData.submitData);
  });
});
