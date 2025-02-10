/// <reference types="cypress" />

describe("Pickup Point Management", () => {
  let pickupPointData;
  let loginData;

  beforeEach(() => {
    // Intercept API request
    cy.intercept(
      "GET",
      "https://api-dev.estuary.solutions:8443/atk-shipping-crm-api-dev/v1/user/me"
    ).as("getUserInfo");

    // Load fixtures
    cy.fixture("pickup-point/pickup-point-add.json")
      .then((data) => {
        pickupPointData = data;
        return cy.fixture("auth/login.json");
      })
      .then((data) => {
        loginData = data;
        cy.visit(pickupPointData.path);
        cy.get("#email").type(loginData.validUser.email);
        cy.get("#password").type(loginData.validUser.password);
        cy.get('button[type="submit"]').click();
      });

    // Đợi API trả về status 200 trước khi chạy test case
    // cy.wait("@getUserInfo").its("response.statusCode").should("eq", 200);
  });

  it("should create pickup point successfully", () => {
    cy.wait(1000);
    cy.visit(pickupPointData.path);

    cy.get('.ant-input[id="name"]')
      .should("be.visible")
      .type(pickupPointData.validPickupPoint.name)
      .should("have.value", pickupPointData.validPickupPoint.name);

    cy.get('.ant-input[id="coordinate"]')
      .should("be.visible")
      .type(pickupPointData.validPickupPoint.coordinate)
      .should("have.value", pickupPointData.validPickupPoint.coordinate);

    // Select radio by value
    cy.get(`[value="${pickupPointData.validPickupPoint.type}"]`).first().click({
      force: true,
    });

    cy.get('.ant-radio-group[id="type"]')
      .should("exist")
      .within(() => {
        cy.get(`[value="${pickupPointData.validPickupPoint.type}"]`)
          .first()
          .click({ force: true })
          .should("be.checked");
      });

    cy.get('.ant-radio-group[id="type"]')
      .find(`.ant-radio-input[value="1"]`)
      .should("be.disabled");

    cy.get('.ant-radio-group[id="type"]')
      .find(`.ant-radio-input[value="1"]`)
      .should("be.disabled")
      .check({ force: true })
      .should("not.be.checked");
  });
});
