/// <reference types="cypress" />

const selectorSpin = {
  toggleSpinLoading: '[data-testid="toggle-spin-loading"]',
  toggleSpinBtn: '[data-testid="toggle-spin-btn"]',
  spinTip: '[data-testid="spin-tip"]',
  smallSpin: '[data-testid="small-spin"]',
  largeSpin: '[data-testid="large-spin"]',
  customIndicatorSpin: '[data-testid="custom-indicator-spin"]',
};

describe('Spin Showcase', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/spin');
  });

  describe('Basic Spin', () => {
    it('should toggle Spin visibility on button click', () => {
      cy.get(selectorSpin.toggleSpinLoading)
        .should('exist')
        .should('not.have.class', 'ant-spin-spinning');

      cy.get(selectorSpin.toggleSpinBtn).click();

      cy.get(selectorSpin.toggleSpinLoading)
        .should('exist')
        .should('have.class', 'ant-spin-spinning');

      cy.get(selectorSpin.toggleSpinBtn).click();

      cy.get(selectorSpin.toggleSpinLoading)
        .should('exist')
        .should('not.have.class', 'ant-spin-spinning');
    });

    it('should render tip text when spinning', () => {
      cy.get(selectorSpin.spinTip)
        .first()
        .within(() => {
          cy.contains('Tip Loading ...').should('be.visible');
        });
    });
  });

  describe('Custom Spin Size', () => {
    it('should display small Spin', () => {
      cy.get(selectorSpin.smallSpin)
        .should('exist')
        .should('have.class', 'ant-spin-sm');
    });

    it('should display large Spin', () => {
      cy.get(selectorSpin.largeSpin)
        .should('exist')
        .should('have.class', 'ant-spin-lg');
    });
  });

  describe('Custom Indicator Spin', () => {
    it('should display custom indicator Spin', () => {
      cy.get(selectorSpin.customIndicatorSpin).each(($el) => {
        cy.wrap($el).within(() => {
          cy.get('.anticon-loading.ant-spin-dot').should('exist');
        });
      });
    });
  });
});
