/// <reference types="cypress" />

const sizeHeights = {
  small: '22px',
  middle: '30px',
  large: '38px',
};

const selectorInputNumber = {
  root: '[data-testid="input-number-showcase"]',
  basic: '[data-testid="basic"]',
  disabled: '[data-testid="disabled"]',
  focus: '[data-testid="focus"]',
  range: '[data-testid="range"]',
  step: '[data-testid="step"]',
  currency: '[data-testid="currency"]',
  readonly: '[data-testid="readonly"]',
  small: '[data-testid="small"]',
  middle: '[data-testid="middle"]',
  large: '[data-testid="large"]',
  addon: '[data-testid="addon-input"]',
  prefixSuffix: '[data-testid="prefix-suffix"]',
  error: '[data-testid="error"]',
  warning: '[data-testid="warning"]',
  outlined: '[date-testid="outlined"]',
  filled: '[date-testid="filled"]',
  borderless: '[date-testid="borderless"]',
};

const checkSizeInputNumber = (selector: string, size = sizeHeights.middle) => {
  cy.get(selector).should('exist').should('have.css', 'height', size);
};

describe('Ant Design InputNumber Showcase', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/input-number');
  });

  it('renders all input numbers', () => {
    cy.get(selectorInputNumber.root)
      .find('input')
      .shouldHaveValue(17, 'length');
  });

  describe('Basic behaviors', () => {
    it('basic input should have default value', () => {
      cy.get(selectorInputNumber.basic).shouldHaveValue('10');
    });

    it('disabled input should be disabled', () => {
      cy.get(selectorInputNumber.disabled).should('be.disabled');
    });

    it('readonly input should not be editable', () => {
      cy.get(selectorInputNumber.readonly).should('have.attr', 'readonly');
    });

    it('should be focused automatically', () => {
      cy.get(selectorInputNumber.focus).should('have.focus');
    });
  });

  describe('Range input', () => {
    it('range input should not allow values outside min/max', () => {
      const input = cy.get(selectorInputNumber.range);
      input.typeAndBlur('10');
      input.shouldHaveValue('10');
      input.typeAndBlur('-2');
      input.shouldHaveValue('1');
    });
  });

  describe('Step and formatting', () => {
    it('step input should increment by step', () => {
      cy.get(selectorInputNumber.step)
        .closest('.ant-input-number')
        .find('.ant-input-number-handler-up')
        .click({ force: true });

      cy.get(selectorInputNumber.step).shouldHaveValue('1.1');
    });

    it('currency input should display formatted value', () => {
      cy.get(selectorInputNumber.currency).shouldHaveValue('$ 1,000');
    });
  });

  describe('Size variants', () => {
    it('should render all size variants', () => {
      checkSizeInputNumber(selectorInputNumber.small, sizeHeights.small);
      checkSizeInputNumber(selectorInputNumber.middle, sizeHeights.middle);
      checkSizeInputNumber(selectorInputNumber.large, sizeHeights.large);
    });
  });

  describe('Addon Before/After', () => {
    it('should render addonBefore and addonAfter with proper labels', () => {
      cy.get(selectorInputNumber.addon)
        .closest('.ant-input-number-wrapper')
        .within(() => {
          cy.get('.ant-input-number-group-addon')
            .first()
            .shouldHaveValue('kg', 'text');
          cy.get('.ant-input-number-group-addon')
            .last()
            .shouldHaveValue('grams', 'text');
        });
    });
  });

  describe('Addon Prefix/Suffix', () => {
    it('should render input with both prefix and suffix', () => {
      cy.get('[data-testid="prefix-suffix"]')
        .closest('.ant-input-number-affix-wrapper')
        .find('.ant-input-number-prefix')
        .should('have.text', '$');

      cy.get('[data-testid="prefix-suffix"]')
        .closest('.ant-input-number-affix-wrapper')
        .find('.ant-input-number-suffix')
        .should('have.text', 'USD');
    });
  });

  describe('Status styles (error, warning)', () => {
    it('should render input with error status', () => {
      cy.get(selectorInputNumber.error)
        .closest('.ant-input-number-status-error')
        .should('exist');
    });

    it('should render input with warning status', () => {
      cy.get(selectorInputNumber.warning)
        .closest('.ant-input-number-status-warning')
        .should('exist');
    });
  });

  describe('Ant Design InputNumber Variants', () => {
    it('should render input with outlined variant', () => {
      cy.get('[data-testid="outlined"]')
        .closest('.ant-input-number-outlined')
        .should('exist');
    });

    it('should render input with filled variant', () => {
      cy.get('[data-testid="filled"]')
        .closest('.ant-input-number-filled')
        .should('exist');
    });

    it('should render input with borderless variant', () => {
      cy.get('[data-testid="borderless"]')
        .closest('.ant-input-number-borderless')
        .should('exist');
    });
  });
});
