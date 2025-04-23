/// <reference types="cypress" />

describe("Ant Design Select Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/select");
  });

  it("renders all select components", () => {
    cy.contains("Single Select").should("exist");
    cy.contains("Multiple Select").should("exist");
    cy.contains("Tags Select").should("exist");
  });

  it("selects an option in single select", () => {
    cy.get(".ant-select").eq(0).click();
    cy.get(".ant-select-item-option").contains("Option 2").click();
    cy.get(".ant-select").eq(0).should("contain", "Option 2");
  });

  it("selects multiple options in multiple select", () => {
    cy.get(".ant-select").eq(1).click();
    cy.get(".ant-select-item-option").contains("Option 1").click();
    cy.get(".ant-select-item-option").contains("Option 3").click();
    cy.get(".ant-select")
      .eq(1)
      .within(() => {
        cy.get(".ant-select-selection-item").should("have.length", 2);
      });
  });

  it("adds and selects tags in tags select", () => {
    cy.get(".ant-select").eq(2).click();
    cy.get(".ant-select-selector input").eq(2).type("Custom Tag{enter}");
    cy.get(".ant-select").eq(2).should("contain", "Custom Tag");
  });

  // Case 5: Kiểm tra placeholder hiển thị đúng
  it("displays correct placeholder for each select", () => {
    cy.get(".ant-select").eq(0).should("contain", "Chọn mục...");
    cy.get(".ant-select").eq(1).should("contain", "Chọn nhiều mục...");
    cy.get(".ant-select").eq(2).should("contain", "Nhập hoặc chọn tag...");
  });

  // Case 6: Xóa một lựa chọn trong multiple select
  it("removes a selected option in multiple select", () => {
    cy.get(".ant-select").eq(1).click();
    cy.get(".ant-select-item-option").contains("Option 1").click();
    cy.get(".ant-select-item-option").contains("Option 2").click();

    cy.get(".ant-select")
      .eq(1)
      .find(".ant-select-selection-item")
      .contains("Option 1")
      .parent()
      .find(".ant-select-selection-item-remove")
      .click();

    cy.get(".ant-select").eq(1).should("not.contain", "Option 1");
  });

  // Case 7: Gõ tìm kiếm (nếu có showSearch)
  it("filters options by search", () => {
    cy.get(".ant-select").eq(0).click();
    cy.get(".ant-select input").first().type("Option 3", { force: true });
    cy.get(".ant-select-item-option").should("contain", "Option 3");
  });

  // Case 8: Không cho chọn lại option đã chọn trong single select
  it("replaces selected value in single select", () => {
    cy.get(".ant-select").eq(0).click();
    cy.get(".ant-select-item-option").contains("Option 1").click();
    cy.get(".ant-select").eq(0).should("contain", "Option 1");

    cy.get(".ant-select").eq(0).click();
    cy.get(".ant-select-item-option").contains("Option 3").click();
    cy.get(".ant-select").eq(0).should("contain", "Option 3");
  });
});
