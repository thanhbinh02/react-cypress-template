// @ts-check
/// <reference types="cypress" />

describe("Ant Design Button Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/button");
  });

  describe("Button Types", () => {
    it("should display primary button with correct text and style", () => {
      cy.contains("button", "Primary Button")
        .should("be.visible")
        .and("have.class", "ant-btn-primary")
        .and("have.css", "background-color", "rgb(22, 119, 255)")
        .and("have.css", "color", "rgb(255, 255, 255)");
    });

    it("should display default button with correct text and style", () => {
      cy.contains("button", "Default Button")
        .should("be.visible")
        .and("have.class", "ant-btn-default")
        .and("have.css", "background-color", "rgb(255, 255, 255)")
        .and("have.css", "color", "rgba(0, 0, 0, 0.88)");
    });

    it("should display dashed button with correct text and style", () => {
      cy.contains("button", "Dashed Button")
        .should("be.visible")
        .and("have.class", "ant-btn-dashed")
        .and("have.css", "border-style", "dashed");
    });

    it("should display text button with correct text and style", () => {
      cy.contains("button", "Text Button")
        .should("be.visible")
        .and("have.class", "ant-btn-text")
        .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
        .and("have.css", "border-color", "rgba(0, 0, 0, 0)");
    });

    it("should display link button with correct text and style", () => {
      cy.contains("button", "Link Button")
        .should("be.visible")
        .and("have.class", "ant-btn-link")
        .and("have.css", "background-color", "rgba(0, 0, 0, 0)")
        .and("have.css", "border-color", "rgba(0, 0, 0, 0)")
        .and("have.css", "color", "rgb(22, 119, 255)");
    });
  });

  describe("Button States", () => {
    it("should display disabled button correctly", () => {
      cy.contains("button", "Disabled Button")
        .should("be.visible")
        .and("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should display loading button correctly", () => {
      cy.contains("button", "Loading Button")
        .should("be.visible")
        .and("have.class", "ant-btn-loading")
        .within(() => {
          cy.get(".ant-btn-loading-icon").should("be.visible");
        });
    });

    it("should display ghost button correctly", () => {
      cy.contains("button", "Ghost Button")
        .should("be.visible")
        .and("have.class", "ant-btn-background-ghost")
        .and("have.css", "background-color", "rgba(0, 0, 0, 0)");
    });
  });

  describe("Button Sizes", () => {
    it("should display large button correctly", () => {
      cy.contains("button", "Large Button")
        .should("be.visible")
        .and("have.class", "ant-btn-lg")
        .and("have.css", "height", "40px")
        .and("have.css", "padding", "0px 15px");
    });

    it("should display medium button correctly", () => {
      cy.contains("button", "Medium Button")
        .should("be.visible")
        .and("have.css", "height", "32px")
        .and("have.css", "padding", "0px 15px");
    });

    it("should display small button correctly", () => {
      cy.contains("button", "Small Button")
        .should("be.visible")
        .and("have.class", "ant-btn-sm")
        .and("have.css", "height", "24px")
        .and("have.css", "padding", "0px 7px");
    });
  });

  describe("Button with Icons", () => {
    it("should display button with download icon correctly", () => {
      cy.contains("button", "Download")
        .should("be.visible")
        .within(() => {
          cy.get(".anticon-download").should("be.visible");
        });
    });

    it("should display button with search icon correctly", () => {
      cy.contains("button", "Search")
        .should("be.visible")
        .within(() => {
          cy.get(".anticon-search").should("be.visible");
        });
    });

    it("should display circular button with plus icon correctly", () => {
      cy.get(".ant-btn-circle")
        .should("be.visible")
        .within(() => {
          cy.get(".anticon-plus").should("be.visible");
        });
    });

    it("should display button with loading icon correctly", () => {
      cy.contains("button", "Loading")
        .should("be.visible")
        .within(() => {
          cy.get(".anticon-loading").should("be.visible");
        });
    });
  });

  describe("Button Groups", () => {
    it("should display button group correctly", () => {
      cy.get(".ant-btn-group")
        .should("be.visible")
        .within(() => {
          cy.contains("button", "Cancel").should("be.visible");
          cy.contains("button", "OK").should("be.visible");
        });
    });

    it("should handle button group interactions", () => {
      cy.get(".ant-btn-group").within(() => {
        cy.contains("button", "OK")
          .click()
          .should("have.class", "ant-btn-primary");
      });
    });
  });

  describe("Button Interactions", () => {
    it("should show hover state on primary button", () => {
      const button = cy.contains("button", "Primary Button");
      button.should("be.visible");
      button.trigger("mouseover");
      button.should("have.css", "background-color", "rgb(22, 119, 255)");
    });

    it("should show active state on primary button", () => {
      const button = cy.contains("button", "Primary Button");
      button.should("be.visible");
      button.trigger("mousedown");
      button.should("have.css", "background-color", "rgb(22, 119, 255)");
    });
  });
});
