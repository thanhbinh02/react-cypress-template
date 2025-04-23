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

const selectorsTooltip = {
  leftBtn: '[data-testid="tooltipLeft"]',
  topBtn: '[data-testid="tooltipTop"]',
  rightBtn: '[data-testid="tooltipRight"]',
  bottomBtn: '[data-testid="tooltipBottom"]',
  emailInput: '[data-testid="input-hover"]',
  passwordInput: '[data-testid="input-click"]',
  emptyTooltipBtn: '[data-testid="tooltip-disabled"]',
};

describe('Tooltip Showcase Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/tooltip');
  });

  describe('Tooltip Display on Hover', () => {
    it('Should show tooltip on hover - Left', () => {
      verifyTooltip({
        selector: selectorsTooltip.leftBtn,
        tooltipText: 'Placement left',
        placement: 'left',
      });
    });

    it('Should show tooltip on hover - Top', () => {
      verifyTooltip({
        selector: selectorsTooltip.topBtn,
        tooltipText: 'Placement top',
        placement: 'top',
      });
    });

    it('Should show tooltip on hover - Right', () => {
      verifyTooltip({
        selector: selectorsTooltip.rightBtn,
        tooltipText: 'Placement right',
        placement: 'right',
      });
    });

    it('Should show tooltip on hover - Bottom', () => {
      verifyTooltip({
        selector: selectorsTooltip.bottomBtn,
        tooltipText: 'Placement bottom',
        placement: 'bottom',
      });
    });

    it('Should show tooltip on hover - Email Input', () => {
      verifyTooltip({
        selector: selectorsTooltip.emailInput,
        tooltipText: 'Please enter your email',
        placement: 'topLeft',
      });
    });
  });

  describe('Tooltip Display on Click', () => {
    it('Should show tooltip on click - Password Input', () => {
      verifyTooltip({
        selector: selectorsTooltip.passwordInput,
        tooltipText: 'Please enter your password',
        placement: 'bottom',
        trigger: 'click',
      });
    });
  });

  describe('Tooltip with Empty Content', () => {
    it('Should not show tooltip for empty content', () => {
      verifyTooltip({
        selector: selectorsTooltip.emptyTooltipBtn,
        tooltipText: '',
      });
    });
  });
});
