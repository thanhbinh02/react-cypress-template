/// <reference types="cypress" />

const selectorInputNumber = {
  root: '[data-testid="input-number-showcase"]',
  basic: '[data-testid="basic"]',
  disabled: '[data-testid="disabled"]',
  controlled: '[data-testid="controlled"]',
  range: '[data-testid="range"]',
  step: '[data-testid="step"]',
  currency: '[data-testid="currency"]',
  readonly: '[data-testid="readonly"]',
  small: '[data-testid="small"]',
  middle: '[data-testid="middle"]',
  large: '[data-testid="large"]',
  addon: '[data-testid="addon-input"]',
};

describe('Ant Design InputNumber Showcase', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/input-number');
  });

  it('renders all input numbers', () => {
    cy.get(selectorInputNumber.root).find('input').should('have.length', 11);
  });

  describe('Basic behaviors', () => {
    it('basic input should have default value', () => {
      cy.get(selectorInputNumber.basic).should('have.value', '10');
    });

    it('disabled input should be disabled', () => {
      cy.get(selectorInputNumber.disabled).should('be.disabled');
    });

    it('readonly input should not be editable', () => {
      cy.get(selectorInputNumber.readonly).should('have.attr', 'readonly');
    });
  });

  describe('Controlled and Range input', () => {
    it('controlled input should accept and reflect input', () => {
      cy.get(selectorInputNumber.controlled)
        .clear()
        .type('55')
        .should('have.value', '55');
    });

    it('range input should not allow values outside min/max', () => {
      const input = cy.get(selectorInputNumber.range);
      input.clear().type('15').blur();
      input.should('have.value', '10');
      input.clear().type('-2').blur();
      input.should('have.value', '1');
    });
  });

  describe('Step and formatting', () => {
    it('step input should increment by step', () => {
      cy.get(selectorInputNumber.step)
        .closest('.ant-input-number')
        .find('.ant-input-number-handler-up')
        .click({ force: true });

      cy.get(selectorInputNumber.step).should('have.value', '1.1');
    });

    it('currency input should display formatted value', () => {
      cy.get(selectorInputNumber.currency).should('have.value', '$ 1,000');
    });
  });

  describe('Size variants', () => {
    it('should render all size variants', () => {
      cy.get(selectorInputNumber.small).should('exist');
      cy.get(selectorInputNumber.middle).should('exist');
      cy.get(selectorInputNumber.large).should('exist');
    });
  });

  describe('Addon Before/After', () => {
    it('should render addonBefore and addonAfter with proper labels', () => {
      cy.get(selectorInputNumber.addon)
        .closest('.ant-input-number-wrapper')
        .within(() => {
          cy.get('.ant-input-number-group-addon')
            .first()
            .should('have.text', 'kg');
          cy.get('.ant-input-number-group-addon')
            .last()
            .should('have.text', 'grams');
        });
    });
  });
});
