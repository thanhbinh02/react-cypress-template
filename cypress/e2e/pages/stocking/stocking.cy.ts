import '../../../support/commands';
/// <reference types="cypress" />

describe('Stocking Flow', () => {
  let loginData: {
    page: string;
    loginPath: string;
    validUser: { username: string; password: string; message: string };
  };

  before(() => {
    cy.fixture('auth/login.json').then((data) => {
      loginData = data;
      Cypress.env('page', data.page);
      Cypress.env('loginPath', data.loginPath);

      cy.visit(`${data.page}${data.loginPath}`);
      cy.selectCountryAndLanguage();
      cy.login(
        data.validUser.username,
        data.validUser.password,
        data.validUser.message
      );
      cy.wait(1000);

      cy.visit(`${loginData.page}/home/3/ponds/10/stocking`);
    });
  });

  // it('should open Add New Stocking card and get its body', () => {
  //   cy.contains('Add New Stocking').click({ force: true });
  //   cy.wait(1000);

  //   cy.get('.ant-card')
  //     .contains('.ant-card-head-title', 'Add New Stocking')
  //     .parents('.ant-card')
  //     .as('card');

  //   cy.get('@card').within(() => {
  //     cy.contains('.ant-tabs-tab-btn', 'Create manually').should('exist');
  //     cy.contains('.ant-tabs-tab-btn', 'Import Excel').should('exist');
  //     cy.get('#batches_0_breedingId').click({ force: true });
  //   });

  //   cy.get('.ant-select-dropdown .ant-select-item-option')
  //     .first()
  //     .click({ force: true });

  //   cy.get('@card').within(() => {
  //     cy.get('#batches_0_origin').type('VN');
  //     cy.get('#batches_0_initialQuantity').type('10000');
  //     cy.get('#batches_0_cost').type('20000');
  //     cy.get('#batches_0_weight').type('10000');
  //   });
  //   cy.submitForm();

  //   cy.contains('Stocking information is recorded').should('be.visible');
  // });

  function selectBreedingOption(selectId: string, optionIndex: number) {
    cy.get(`#${selectId}`).click({ force: true });

    cy.get(`#${selectId}_list`)
      .should('exist')
      .parent()
      .find('.ant-select-item-option')
      .eq(optionIndex)
      .click({ force: true });
  }

  it('should create 3 stocking records in one submit', () => {
    cy.contains('Add New Stocking').click({ force: true });
    cy.wait(1000);
    cy.get('input#imageIds').attachFile('vietnam.png');

    cy.get('#stockingDate').click({ force: true });

    cy.get('.ant-picker-dropdown') // dropdown hiện tại
      .last() // dùng last để tránh chọn nhầm nếu có nhiều dropdown
      .find('td') // ô ngày
      .not('.ant-picker-cell-disabled') // bỏ qua các ô disabled
      .contains(/^10$/) // tìm đúng số 15
      .click({ force: true });

    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Add New Stocking')
      .parents('.ant-card')
      .as('card');

    // --- Record 1 ---
    selectBreedingOption('batches_0_breedingId', 0);

    cy.get('@card').within(() => {
      cy.get('#batches_0_origin').type('VN');
      cy.get('#batches_0_initialQuantity').type('10000');
      cy.get('#batches_0_cost').type('20000');
      cy.get('#batches_0_weight').type('10000');

      cy.contains('Add row').click();
    });

    // --- Record 2 ---
    selectBreedingOption('batches_1_breedingId', 3);

    cy.get('@card').within(() => {
      cy.get('#batches_1_origin').type('JP');
      cy.get('#batches_1_initialQuantity').type('5000');
      cy.get('#batches_1_cost').type('15000');
      cy.get('#batches_1_weight').type('8000');

      cy.contains('Add row').click();
    });

    // --- Record 3 ---
    selectBreedingOption('batches_2_breedingId', 1);

    cy.get('@card').within(() => {
      cy.get('#batches_2_origin').type('BD');
      cy.get('#batches_2_initialQuantity').type('7000');
      cy.get('#batches_2_cost').type('8000');
      cy.get('#batches_2_weight').type('90000');
    });

    cy.submitForm();

    cy.contains('Stocking information is recorded').should('be.visible');
  });

  // it('should show error if cost is empty and Save is clicked', () => {
  //   cy.contains('Add New Stocking').click({ force: true });

  //   cy.get('.ant-card')
  //     .contains('.ant-card-head-title', 'Add New Stocking')
  //     .parents('.ant-card')
  //     .as('card');

  //   cy.get('@card').within(() => {
  //     cy.get('#batches_0_origin').type('VN');
  //     cy.get('#batches_0_initialQuantity').type('20000');
  //     cy.get('#batches_0_weight').type('20000');
  //     cy.get('input#imageIds').attachFile('vietnam.png');
  //     cy.get('.ant-upload-list').should('contain', 'vietnam.png');
  //   });

  //   cy.submitForm();

  //   cy.get('#batches_0_cost_help').should('contain', 'This field is required');
  // });
});
