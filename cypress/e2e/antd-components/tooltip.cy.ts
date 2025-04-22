// @ts-check
/// <reference types="cypress" />

const verifyTooltip = ({
  selector,
  tooltipText,
  placement = 'top',
  trigger = 'hover',
}) => {
  const tooltipVisibleClass = `.ant-tooltip-placement-${placement}`;

  if (!tooltipText) {
    cy.get(selector).trigger('mouseover');
    cy.get('.ant-tooltip').should('not.exist');
    return;
  }

  if (trigger === 'hover') {
    cy.get(selector).trigger('mouseover');
  } else if (trigger === 'click') {
    cy.get(selector).click();
  }

  cy.get(tooltipVisibleClass).should('exist').and('contain', tooltipText);

  if (trigger === 'hover') {
    cy.get(selector).trigger('mouseout');
  } else {
    cy.get('body').click(0, 0);
  }

  cy.get(tooltipVisibleClass).should('have.class', 'ant-tooltip-hidden');
};

describe('Tooltip Showcase Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/tooltip');
  });

  const selectors = {
    leftBtn: '[data-testid="tooltipLeft"]',
    topBtn: '[data-testid="tooltipTop"]',
    rightBtn: '[data-testid="tooltipRight"]',
    bottomBtn: '[data-testid="tooltipBottom"]',
    emailInput: '[data-testid="input-hover"]',
    passwordInput: '[data-testid="input-click"]',
    emptyTooltipBtn: '[data-testid="tooltip-disabled"]',
  };

  it('Should show tooltip on hover - Left', () => {
    verifyTooltip({
      selector: selectors.leftBtn,
      tooltipText: 'Placement left',
      placement: 'left',
    });
  });

  it('Should show tooltip on hover - Top', () => {
    verifyTooltip({
      selector: selectors.topBtn,
      tooltipText: 'Placement top',
      placement: 'top',
    });
  });

  it('Should show tooltip on hover - Right', () => {
    verifyTooltip({
      selector: selectors.rightBtn,
      tooltipText: 'Placement right',
      placement: 'right',
    });
  });

  it('Should show tooltip on hover - Bottom', () => {
    verifyTooltip({
      selector: selectors.bottomBtn,
      tooltipText: 'Placement bottom',
      placement: 'bottom',
    });
  });

  it('Should show tooltip on hover - Email Input', () => {
    verifyTooltip({
      selector: selectors.emailInput,
      tooltipText: 'Please enter your email',
      placement: 'topLeft',
    });
  });

  it('Should show tooltip on click - Password Input', () => {
    verifyTooltip({
      selector: selectors.passwordInput,
      tooltipText: 'Please enter your password',
      placement: 'bottom',
      trigger: 'click',
    });
  });

  it('Should not show tooltip for empty content', () => {
    verifyTooltip({
      selector: selectors.emptyTooltipBtn,
      tooltipText: '',
    });
  });
});
