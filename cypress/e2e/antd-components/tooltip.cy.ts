// @ts-check
/// <reference types="cypress" />

describe('Ant Design Tooltip', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inputSelectors = {
    emailInput: '[data-testid="login-page-input-email"]',
    passwordInput: '[data-testid="login-page-input-password"]',
    disabledTooltip: '[data-testid="tooltip-disabled"]',
    tooltipVisible: '.ant-tooltip-open',
  };

  const verifyTooltip = ({ selector, tooltipText, placement = 'top', trigger = 'hover' }) => {
    // Case when Tooltip has no content (should not be displayed)
    if (!tooltipText) {
      cy.get(selector).trigger('mouseover');
      cy.get(inputSelectors.tooltipVisible).should('not.exist');
      return;
    }

    // Activate Tooltip based on trigger type (hover or click)
    if (trigger === 'hover') {
      cy.get(selector).trigger('mouseover');
    } else if (trigger === 'click') {
      cy.get(selector).click();
    }

    // Verify Tooltip content and placement
    cy.get(`.ant-tooltip-placement-${placement}`).should('exist').and('contain', tooltipText);

    // Verify Tooltip disappears when mouse leaves or clicking outside
    if (trigger === 'hover') {
      cy.get(selector).trigger('mouseout');
    } else {
      cy.get('body').click(0, 0);
    }
    cy.get(`.ant-tooltip-placement-${placement}`).should('have.class', 'ant-tooltip-hidden');
  };

  it('Should display Tooltip when hovering over the email input field', () => {
    verifyTooltip({
      selector: inputSelectors.emailInput,
      tooltipText: 'Nhập địa chỉ email của bạn',
      placement: 'topLeft',
    });
  });

  it('Should display Tooltip when clicking on the password input field', () => {
    verifyTooltip({
      selector: inputSelectors.passwordInput,
      tooltipText: 'Vui lòng nhập mật khẩu',
      trigger: 'click',
      placement: 'bottom',
    });
  });

  it('Tooltip should not be displayed if the content is empty or null', () => {
    verifyTooltip({
      selector: inputSelectors.disabledTooltip,
      tooltipText: '',
    });
  });
});
