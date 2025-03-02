// @ts-check
/// <reference types="cypress" />

describe('Login Popconfirm', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inputSelectors = {
    buttonNeedConfirm: '[data-testid="login-page-btn-login"]',
    popConfirmButtons: '.ant-popconfirm-buttons .ant-btn',
    popConfirmTitle: '.ant-popconfirm-title',
  };

  // Function to verify Popconfirm behavior
  const confirmPopconfirm = (buttonText, title = '', placement = 'top') => {
    cy.get(inputSelectors.buttonNeedConfirm).click();
    cy.get('.ant-popover-hidden').should('not.exist');
    cy.get(`.ant-popover-placement-${placement}`).should('exist');

    if (title) {
      cy.get(inputSelectors.popConfirmTitle).should('have.text', title);
    }

    cy.get(inputSelectors.popConfirmButtons).contains(buttonText).click({ force: true });

    cy.get('.ant-popover-hidden').should('exist');
  };

  // Function to check if clicking outside closes the Popconfirm
  const confirmPopconfirmClickOutside = () => {
    cy.get(inputSelectors.buttonNeedConfirm).click();
    cy.get('.ant-popover-hidden').should('not.exist');
    cy.get('body').click(0, 0);
    cy.get('.ant-popover-hidden').should('exist');
  };

  it('should confirm login when clicking "OK"', () => {
    confirmPopconfirm('OK', 'Bạn có chắc muốn đăng nhập?', 'top');
  });

  it('should cancel login when clicking "Cancel"', () => {
    confirmPopconfirm('Cancel');
  });

  it('should close Popconfirm when clicking outside', () => {
    confirmPopconfirmClickOutside();
  });
});
