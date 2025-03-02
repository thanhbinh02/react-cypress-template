// @ts-check
/// <reference types="cypress" />

describe('Ant Design Checkbox Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inputSelectors = {
    standardCheckbox: '[data-testid="checkbox-test"]',
    disabledCheckbox: '[data-testid="checkbox-disabled"]',
    checkboxGroup: '[data-testid="checkbox-group-test"]',
    selectAllCheckbox: '[data-testid="checkbox-select-all"]',
  };

  // Test whether a checkbox can be toggled or remains unchangeable if disabled.
  function verifyCheckbox(checkboxSelector, expectedLabel, isDisabled = false) {
    cy.get(checkboxSelector)
      .closest('.ant-checkbox-wrapper')
      .should('contain.text', expectedLabel)
      .within(() => {
        cy.get('input[type="checkbox"]').as('checkbox');

        if (isDisabled) {
          cy.get('@checkbox').should('be.disabled').check({ force: true }).should('not.be.checked');
        } else {
          cy.get('@checkbox').check({ force: true }).should('be.checked');
          cy.get('@checkbox').uncheck({ force: true }).should('not.be.checked');
        }
      });
  }
  // Test whether all checkboxes in a group can be selected and deselected.
  function verifyCheckboxGroupBehavior(groupSelector) {
    cy.get(groupSelector).within(() => {
      // Select all checkboxes in the group and ensure they are checked.
      cy.get('input[type="checkbox"]').each(($checkbox) => {
        cy.wrap($checkbox).check().should('be.checked');
      });

      // Unselect all checkboxes in the group and ensure they are unchecked.
      cy.get('input[type="checkbox"]').each(($checkbox) => {
        cy.wrap($checkbox).uncheck().should('not.be.checked');
      });
    });
  }

  // Test the behavior of the "Select All" checkbox within a group.
  function verifySelectAllCheckbox(selectAllSelector, groupSelector) {
    // Check the "Select All" checkbox → All checkboxes in the group should be checked.
    cy.get(selectAllSelector).check().should('be.checked');
    cy.get(groupSelector).find('input[type="checkbox"]').should('be.checked');

    // Uncheck the "Select All" checkbox → All checkboxes in the group should be unchecked.
    cy.get(selectAllSelector).uncheck().should('not.be.checked');
    cy.get(groupSelector).find('input[type="checkbox"]').should('not.be.checked');
  }

  it('should allow toggling a standard checkbox', () => {
    // Verify that a standard checkbox can be checked and unchecked.
    verifyCheckbox(inputSelectors.standardCheckbox, 'Remember me');
  });

  it('should ensure a disabled checkbox cannot be changed', () => {
    // Verify that a disabled checkbox remains unchecked even when clicked.
    verifyCheckbox(inputSelectors.disabledCheckbox, 'Disabled Checkbox', true);
  });

  it('should allow selecting and deselecting checkboxes in a group', () => {
    // Verify that checkboxes within a group can be selected and deselected.
    verifyCheckboxGroupBehavior(inputSelectors.checkboxGroup);
  });

  it('should correctly toggle all checkboxes using "Select All"', () => {
    // Verify that the "Select All" checkbox selects/deselects all checkboxes in the group.
    verifySelectAllCheckbox(inputSelectors.selectAllCheckbox, inputSelectors.checkboxGroup);
  });
});
