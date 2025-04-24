/// <reference types="cypress" />

const selectorPopConfirm = {
  basic: '[data-testid="basic"]',
  disabled: '[data-testid="disabled-confirm"]',
  customIcon: '[data-testid="custom-icon"]',
  customButtons: '[data-testid="custom-buttons"]',
  asyncConfirm: '[data-testid="async-confirm"]',
  noIcon: '[data-testid="no-icon"]',
  topPlacement: '[data-testid="top-placement"]',
  bottomPlacement: '[data-testid="bottom-placement"]',
  leftPlacement: '[data-testid="left-placement"]',
  rightPlacement: '[data-testid="right-placement"]',
};

describe('PopConfirm Showcase', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/pop-confirm');
  });

  describe('Basic Functionality', () => {
    it('should display the popconfirm popup on click', () => {
      cy.get(selectorPopConfirm.basic).click();
      cy.get('.ant-popover').should('exist').and('be.visible');
    });

    it('should render and show basic popconfirm with title', () => {
      cy.get(selectorPopConfirm.basic).click();
      cy.get('.ant-popconfirm-title').should(
        'contain.text',
        'Are you sure to delete this item?'
      );
    });

    it('should render and show basic popconfirm with description', () => {
      cy.get(selectorPopConfirm.basic).click();
      cy.get('.ant-popconfirm-description').should(
        'contain.text',
        'This action cannot be undone.'
      );
    });

    it('should render correct label for Confirm and Cancel buttons', () => {
      cy.get(selectorPopConfirm.basic).click();
      cy.get('.ant-popconfirm-buttons').within(() => {
        cy.contains('Yes').should('exist');
        cy.contains('No').should('exist');
      });
    });

    it('should close popconfirm on cancel click', () => {
      cy.get(selectorPopConfirm.basic).click();
      cy.contains('No').click();
      cy.get('.ant-popover').should('have.class', 'ant-popover-hidden');
    });

    it('should close when clicking outside', () => {
      cy.get(selectorPopConfirm.basic).click();
      cy.get('body').click(0, 0);
      cy.get('.ant-popover').should('have.class', 'ant-popover-hidden');
    });

    it('should not render multiple popconfirms on rapid clicks', () => {
      cy.get(selectorPopConfirm.basic).click().click().click();
      cy.get('.ant-popover').should('have.length', 1);
    });

    it('should not open when disabled', () => {
      cy.get(selectorPopConfirm.disabled).click();
      cy.get('.ant-popover').should('not.exist');
    });
  });

  describe('Customization', () => {
    it('should render custom icon in popconfirm', () => {
      cy.get(selectorPopConfirm.customIcon).click();
      cy.get('.ant-popover-inner-content .anticon-exclamation-circle').should(
        'exist'
      );
    });

    it('should render custom OK/Cancel button labels', () => {
      cy.get(selectorPopConfirm.customButtons).click();
      cy.get('.ant-popconfirm-buttons').within(() => {
        cy.contains('Cancel').should('exist');
        cy.contains('Proceed').should('exist');
      });
    });

    it('should render popconfirm without icon', () => {
      cy.get(selectorPopConfirm.noIcon).click();
      cy.get('.ant-popover-inner-content .anticon').should('not.exist');
    });
  });

  describe('Async Behavior', () => {
    it('should show loading state when confirming async', () => {
      cy.get(selectorPopConfirm.asyncConfirm).click();

      cy.get('.ant-popover button.ant-btn-primary').contains('Confirm').click();

      cy.get('.ant-popover button.ant-btn-primary', { timeout: 4000 }).should(
        'have.class',
        'ant-btn-loading'
      );

      cy.wait(1600);
      cy.get('.ant-popover').should('have.class', 'ant-popover-hidden');
    });

    it('should not allow clicking confirm again during loading', () => {
      cy.get(selectorPopConfirm.asyncConfirm).click();
      cy.get('.ant-popover button.ant-btn-primary').contains('Confirm').click();
      cy.get('.ant-popover button.ant-btn-primary').contains('Confirm').click();
      cy.get('.ant-btn-loading').should('exist');
    });
  });

  describe('Placement', () => {
    it('should render popconfirm with top placement', () => {
      cy.get(selectorPopConfirm.topPlacement).click(); // Click nút "Top Placement"
      cy.get('.ant-popover').should('have.class', 'ant-popover-placement-top'); // Kiểm tra popconfirm có class "top"
    });

    it('should render popconfirm with bottom placement', () => {
      cy.get(selectorPopConfirm.bottomPlacement).click(); // Click nút "Bottom Placement"
      cy.get('.ant-popover').should(
        'have.class',
        'ant-popover-placement-bottom'
      ); // Kiểm tra popconfirm có class "bottom"
    });

    it('should render popconfirm with left placement', () => {
      cy.get(selectorPopConfirm.leftPlacement).click(); // Click nút "Left Placement"
      cy.get('.ant-popover').should('have.class', 'ant-popover-placement-left'); // Kiểm tra popconfirm có class "left"
    });

    it('should render popconfirm with right placement', () => {
      cy.get(selectorPopConfirm.rightPlacement).click(); // Click nút "Right Placement"
      cy.get('.ant-popover').should(
        'have.class',
        'ant-popover-placement-right'
      ); // Kiểm tra popconfirm có class "right"
    });
  });
});
