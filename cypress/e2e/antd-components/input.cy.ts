// @ts-check
/// <reference types="cypress" />

import { checkInputProps } from '../../support/inputTestUtils';

const selectorInput = {
  root: '[data-testid="input-showcase"]',
  basic: '#basicInput',
  disabled: '#disabledInput',
  readOnly: '#readOnlyInput',
  large: '#largeInput',
  medium: '#mediumInput',
  small: '#smallInput',
  password: '#passwordInput',
  number: '#numberInput',
  email: '#emailInput',
  prefix: '#prefixInput',
  suffix: '#suffixInput',
  addonBefore: '#addonBeforeInput',
  addonAfter: '#addonAfterInput',
  error: '#errorInput',
  warning: '#warningInput',
  clearable: '#clearableInput',
};

describe('Ant Design Input Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/input');
  });

  it('renders all inputs', () => {
    cy.get(selectorInput.root).find('input').should('have.length.at.least', 10);
  });

  describe('Basic Input Functionality', () => {
    it('should display input and allow typing', () => {
      checkInputProps(selectorInput.basic, {
        testTyping: 'Hello World',
      });
    });

    it('should display input with placeholder', () => {
      checkInputProps(selectorInput.basic, {
        placeholder: 'Basic Input',
      });
    });

    it('should display disabled input', () => {
      checkInputProps(selectorInput.disabled, {
        disabled: true,
      });
    });

    it('should display read-only input', () => {
      checkInputProps(selectorInput.readOnly, {
        readOnly: true,
      });
    });

    it('should have default value for read-only input', () => {
      checkInputProps(selectorInput.readOnly, {
        defaultValue: 'Read only',
        readOnly: true,
      });
    });
  });

  describe('Input Sizes', () => {
    it('should display large input', () => {
      checkInputProps(selectorInput.large, {
        sizeClass: 'large',
      });
    });

    it('should display medium input', () => {
      checkInputProps(selectorInput.medium, {
        sizeClass: 'middle',
      });
    });

    it('should display small input', () => {
      checkInputProps(selectorInput.small, {
        sizeClass: 'small',
      });
    });
  });

  describe('Input Types', () => {
    it('should display password input', () => {
      checkInputProps(selectorInput.password, {
        type: 'password',
      });
    });

    it('should display number input', () => {
      checkInputProps(selectorInput.number, {
        type: 'number',
      });
    });

    it('should display email input', () => {
      checkInputProps(selectorInput.email, {
        type: 'email',
      });
    });
  });

  describe('Input with Prefix/Suffix', () => {
    it('should display input with prefix', () => {
      checkInputProps(selectorInput.prefix, {
        prefix: true,
      });
    });

    it('should display input with suffix', () => {
      checkInputProps(selectorInput.suffix, {
        suffix: true,
      });
    });
  });

  describe('Input with Addon', () => {
    it('should display input with addon before', () => {
      checkInputProps(selectorInput.addonBefore, {
        addonBefore: true,
      });
    });

    it('should display input with addon after', () => {
      checkInputProps(selectorInput.addonAfter, {
        addonAfter: true,
      });
    });
  });

  describe('Input Status', () => {
    it('should display input with error status', () => {
      checkInputProps(selectorInput.error, {
        statusError: true,
      });
    });

    it('should display input with warning status', () => {
      checkInputProps(selectorInput.warning, {
        statusWarning: true,
      });
    });
  });

  describe('Input Interactions', () => {
    it('should clear input value with clear icon', () => {
      checkInputProps(selectorInput.clearable, {
        clearable: true,
      });
    });

    it('should show password when eye icon is clicked', () => {
      checkInputProps(selectorInput.password, {
        passwordEye: true,
      });
    });
  });
});
