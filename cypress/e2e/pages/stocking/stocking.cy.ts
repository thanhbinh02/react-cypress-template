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

      cy.visit(`${loginData.page}/home/1/ponds/27/stocking`);
    });
  });

  afterEach(() => {
    cy.wait(2000);
  });

  it('should open Add New Stocking card and get its body', () => {
    cy.contains('Add New Stocking').click({ force: true });
    cy.wait(1000);

    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Add New Stocking')
      .parents('.ant-card')
      .as('card');

    cy.get('@card').within(() => {
      cy.contains('.ant-tabs-tab-btn', 'Create manually').should('exist');
      cy.contains('.ant-tabs-tab-btn', 'Import Excel').should('exist');
      cy.get('#batches_0_breedingId').click({ force: true });
    });

    cy.get('.ant-select-dropdown .ant-select-item-option')
      .first()
      .click({ force: true });

    cy.get('@card').within(() => {
      cy.get('#batches_0_origin').slowType('VN');
      cy.get('#batches_0_initialQuantity').slowType('10000');
      cy.get('#batches_0_cost').slowType('20000');
      cy.get('#batches_0_weight').slowType('10000');
    });
    cy.submitForm();

    cy.contains('Stocking information is recorded').should('be.visible');
  });

  it('should create 3 stocking records in one submit', () => {
    cy.contains('Add New Stocking').click({ force: true });
    cy.wait(1000);
    cy.get('input#imageIds').attachFile('vietnam.png');

    cy.selectDate('#stockingDate', { day: '19', month: 'Feb' });

    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Add New Stocking')
      .parents('.ant-card')
      .as('card');

    // --- Record 1 ---
    cy.selectOption('batches_0_breedingId', 0);

    cy.get('@card').within(() => {
      cy.get('#batches_0_origin').slowType('VN');
      cy.get('#batches_0_initialQuantity').slowType('12000');
      cy.get('#batches_0_cost').slowType('24000');
      cy.get('#batches_0_weight').slowType('17000');

      cy.contains('Add row').click();
    });

    // --- Record 2 ---
    cy.selectOption('batches_1_breedingId', 3);

    cy.get('@card').within(() => {
      cy.get('#batches_1_origin').slowType('JP');
      cy.get('#batches_1_initialQuantity').slowType('5000');
      cy.get('#batches_1_cost').slowType('15000');
      cy.get('#batches_1_weight').slowType('8000');

      cy.contains('Add row').click();
    });

    // --- Record 3 ---
    cy.selectOption('batches_2_breedingId', 1);

    cy.get('@card').within(() => {
      cy.get('#batches_2_origin').slowType('BD');
      cy.get('#batches_2_initialQuantity').slowType('7000');
      cy.get('#batches_2_cost').slowType('8000');
      cy.get('#batches_2_weight').slowType('90000');
    });

    cy.submitForm();

    cy.contains('Stocking information is recorded').should('be.visible');
  });

  it('should show error if cost is empty and Save is clicked', () => {
    cy.contains('Add New Stocking').click({ force: true });

    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Add New Stocking')
      .parents('.ant-card')
      .as('card');

    cy.get('@card').within(() => {
      cy.get('#batches_0_origin').slowType('VN');
      cy.get('#batches_0_initialQuantity').slowType('20000');
      cy.get('#batches_0_weight').slowType('20000');
      cy.get('input#imageIds').attachFile('vietnam.png');
      cy.get('.ant-upload-list').should('contain', 'vietnam.png');
    });

    cy.submitForm();

    cy.get('#batches_0_cost_help').should('contain', 'This field is required');
  });

  it('should show required field errors and allow cancel', () => {
    cy.contains('Add New Stocking').click({ force: true });
    cy.wait(1000);

    cy.submitForm();

    cy.get('.ant-form-item-explain-error')
      .should('contain', 'This field is required')
      .and('have.length.at.least', 1);

    cy.contains('Stocking information is recorded').should('not.exist');

    cy.cancelForm();
  });

  it('should set cost to 0 when a negative number is entered', () => {
    cy.contains('Add New Stocking').click({ force: true });

    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Add New Stocking')
      .parents('.ant-card')
      .as('card');

    cy.get('@card').within(() => {
      cy.get('#batches_0_origin').slowType('VN');
      cy.get('#batches_0_initialQuantity').slowType('20000');
      cy.get('#batches_0_cost').slowType('20000');
      cy.get('input#imageIds').attachFile('vietnam.png');
      cy.get('.ant-upload-list').should('contain', 'vietnam.png');

      cy.get('#batches_0_weight')
        .type('-5000')
        .blur()
        .should('have.value', '0');
    });

    cy.submitForm();

    cy.contains('An error has occurred. Please try again later!').should(
      'exist'
    );

    cy.cancelForm();
  });

  it('should find first record in table and click Edit', () => {
    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Stocking')
      .parents('.ant-card')
      .as('card');

    cy.get('.ant-table-tbody > tr:not([aria-hidden="true"])')
      .first()
      .within(() => {
        cy.get('img[src="/images/edit-icon.png"]')
          .should('be.visible')
          .parents('button')
          .click({ force: true });
      });

    cy.get('.ant-modal').contains('Stocking detail').should('be.visible');
    cy.get('.ant-modal').within(() => {
      cy.get('input#imageIds').attachFile('vietnam.png');
      cy.wait(1000);
      cy.get('#batches_0_cost').clear().slowType('24000');
      cy.get('#note').slowType('test note');
    });

    cy.get('.ant-modal').within(() => {
      cy.contains('Save').click();
    });

    cy.get('.ant-popover').should('be.visible');
    cy.get('.ant-popover .ant-btn-primary').contains('Agree').click();
  });

  it('should find first record in table and click Transfer', () => {
    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Stocking')
      .parents('.ant-card')
      .as('card');

    cy.get('.ant-pagination-item-2').click();
    cy.wait(500);

    cy.get('.ant-table-tbody > tr:not([aria-hidden="true"])')
      .contains('td', '05/05/2025')
      .parents('tr')
      .first()
      .within(() => {
        cy.get('img[src="/images/transfer-icon.png"]')
          .should('be.visible')
          .parents('button')
          .click({ force: true });
      });

    cy.get('#batchId').click({ force: true });
    cy.selectOption('batchId', 0);

    cy.get('#type').within(() => {
      cy.contains('Partial transfer').click({ force: true });
    });
    cy.get('#quantity').slowType('1');

    cy.selectDate('#transferDate', { day: '10' });

    cy.get('#destinationPondId').click({ force: true });
    cy.selectOption('destinationPondId', 0);

    cy.submitForm('Submit');

    cy.contains('Transfer stocking successfully').should('exist');
  });

  it('create stocking with template import', () => {
    cy.reload(true);
    cy.contains('Add New Stocking').click({ force: true });
    cy.wait(1000);

    cy.get('.ant-card')
      .contains('.ant-card-head-title', 'Add New Stocking')
      .parents('.ant-card')
      .as('card');

    cy.get('@card').within(() => {
      cy.contains('.ant-tabs-tab-btn', 'Import Excel')
        .should('exist')
        .click({ force: true });
      cy.contains('Download Template').should('exist').click({ force: true });

      cy.wait(1000);
      cy.get('input[type="file"][name="file"]').attachFile(
        'Template stocking.xlsx',
        { force: true }
      );
    });
    cy.submitForm();
    cy.contains('Please check the result table');
  });
});
