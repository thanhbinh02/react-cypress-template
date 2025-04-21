/// <reference types="cypress" />

describe("Ant Design Message Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/message");
  });

  describe("Basic Message Types", () => {
    it("should display success message with correct content and style", () => {
      cy.get(".ant-btn-success").click();
      cy.get(".ant-message-success").should("contain", "Success message");
    });

    it("should display error message with correct content and style", () => {
      cy.get(".ant-btn-error").click();
      cy.get(".ant-message-error").should("contain", "Error message");
    });

    it("should display warning message with correct content and style", () => {
      cy.get(".ant-btn-warning").click();
      cy.get(".ant-message-warning").should("contain", "Warning message");
    });

    it("should display info message with correct content and style", () => {
      cy.get(".ant-btn-info").click();

      cy.get(".ant-message-info").should("contain", "Info message");
    });
  });

  describe("Message Duration", () => {
    it("should display message with default duration (3s)", () => {
      cy.get(".ant-btn-success").click();
      cy.wait(3000);
      cy.get(".ant-message-notice").should("not.exist");
    });

    it("should display message with custom duration (5s)", () => {
      cy.get(".ant-btn-custom-duration").click();
      cy.wait(5000);
      cy.get(".ant-message-notice").should("not.exist");
    });

    it("should keep loading message visible until manually closed", () => {
      cy.get(".ant-btn-loading").click();
      cy.wait(5000);
    });
  });

  describe("Message Content", () => {
    it("should display message with custom content", () => {
      cy.get(".ant-btn-custom-content").click();
      cy.get(".ant-message-notice")
        .and("contain", "Custom content")
        .and("contain", "Additional information");
    });

    it("should display message with HTML content", () => {
      cy.get(".ant-btn-html").click();
      cy.get(".ant-message-notice").within(() => {
        cy.get("strong").should("contain", "HTML content");
        cy.get("a").should("have.attr", "href");
      });
    });

    it("should display message with custom icon", () => {
      cy.get(".ant-btn-with-icon").click();
      cy.get(".ant-message-notice").within(() => {
        cy.get("span").should("contain", "🔔");
      });
    });
  });

  describe("Message Positioning", () => {
    it("should display message at the top", () => {
      cy.get(".ant-btn-top").click();
      cy.get(".ant-message-top").and("contain", "Top message");
    });

    it("should display message at the bottom", () => {
      cy.get(".ant-btn-bottom").click();
      cy.get(".ant-message-bottom").and("contain", "Bottom message");
    });
  });

  describe("Message Interaction", () => {
    it("should support multiple messages stacking", () => {
      cy.get(".ant-btn-success").click();
      cy.get(".ant-btn-error").click();
      cy.get(".ant-btn-warning").click();

      cy.get(".ant-message-notice").should("have.length", 3);
      cy.get(".ant-message-notice")
        .first()
        .should("contain", "Success message");
      cy.get(".ant-message-notice").last().should("contain", "Warning message");
    });
  });
});
