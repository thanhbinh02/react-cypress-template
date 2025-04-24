/// <reference types="cypress" />

import { checkSelectProps } from "../../support/selectTestUtils";

describe("Ant Design Select Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/select");
  });

  it("should render single select with correct placeholder and default value", () => {
    checkSelectProps("#single-select", {
      type: "single",
      placeholder: "Chọn mục...",
      defaultValue: "1",
      defaultLabels: "Option 1",
    });
  });

  it("should render multiple select with correct placeholder and default values", () => {
    checkSelectProps("#multiple-select", {
      type: "multiple",
      placeholder: "Chọn nhiều mục...",
      defaultValue: ["1", "2"],
      defaultLabels: ["Option 1", "Option 2"],
    });
  });

  it("should render tags select with correct placeholder and default values", () => {
    checkSelectProps("#tags-select", {
      type: "tags",
      placeholder: "Chọn hoặc nhập tags...",
      defaultValue: ["1", "3"],
      defaultLabels: ["Option 1", "Option 3"],
    });
  });
});
