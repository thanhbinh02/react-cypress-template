/// <reference types="cypress" />

const selectorCheckbox = {
  basicCheckbox: '[data-testid="basic-checkbox"]',
  disabledCheckbox: '[data-testid="disabled-checkbox"]',
  checkboxGroup: '[data-testid="checkbox-group"]',
  selectAllCheckbox: '[data-testid="select-all"]',
  selectAllCheckboxDisabled: '[data-testid="select-all-disabled"]',
};

const checkboxLabels = ['Apple', 'Orange', 'Banana'];

describe('Checkbox Showcase', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/checkbox');
  });

  describe('Basic & Disabled Checkbox', () => {
    it('should check and uncheck basic checkbox', () => {
      cy.get(selectorCheckbox.basicCheckbox)
        .as('basic')
        .check()
        .should('be.checked');
      cy.get('@basic').uncheck().should('not.be.checked');
    });

    it('should not change when disabled checkbox is clicked', () => {
      cy.get(selectorCheckbox.disabledCheckbox)
        .as('disabled')
        .should('be.disabled')
        .click({ force: true })
        .should('not.be.checked');
    });
  });

  describe('Checkbox Group Behaviors', () => {
    it('should select and deselect checkboxes in a group', () => {
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .as('group')
        .each(($el) => cy.wrap($el).check().should('be.checked'));
      cy.get('@group').each(($el) =>
        cy.wrap($el).uncheck().should('not.be.checked')
      );
    });

    it('should reflect indeterminate state when some checkboxes are selected', () => {
      cy.get(selectorCheckbox.selectAllCheckbox).as('selectAll');
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .first()
        .check();
      cy.get('@selectAll').should('have.prop', 'indeterminate', true);
    });

    it('should update "Select All" state when a checkbox is deselected', () => {
      cy.get(selectorCheckbox.selectAllCheckbox).check().should('be.checked');
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .first()
        .uncheck()
        .should('not.be.checked');
      cy.get(selectorCheckbox.selectAllCheckbox)
        .should('not.be.checked')
        .should('have.prop', 'indeterminate', true);
    });
  });

  describe('Select All – Functionality', () => {
    it('should select all when clicking "Select All" checkbox', () => {
      cy.get(selectorCheckbox.selectAllCheckbox).check().should('be.checked');
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .each(($el) => cy.wrap($el).should('be.checked'));
    });

    it('should deselect all when unchecking "Select All"', () => {
      cy.get(selectorCheckbox.selectAllCheckbox).check().uncheck();
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .each(($el) => cy.wrap($el).should('not.be.checked'));
    });

    it('should select all checkboxes when "Select All" is clicked after one checkbox is checked', () => {
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .first()
        .check()
        .should('be.checked');
      cy.get(selectorCheckbox.selectAllCheckbox).check().should('be.checked');
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .each(($el) => cy.wrap($el).should('be.checked'));
    });

    it('should toggle correctly when Select All is clicked multiple times', () => {
      cy.get(selectorCheckbox.selectAllCheckbox).check().uncheck().check();
      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .each(($el) => cy.wrap($el).should('be.checked'));
    });

    it('should not affect group when Select All is disabled', () => {
      cy.get(selectorCheckbox.selectAllCheckboxDisabled)
        .should('exist')
        .should('be.disabled')
        .should('not.be.checked')
        .click({ force: true });

      cy.get(selectorCheckbox.checkboxGroup)
        .find('input[type="checkbox"]')
        .each(($el) => cy.wrap($el).should('not.be.checked'));
    });
  });

  describe('Labels & Accessibility', () => {
    it('should display correct label text for each checkbox', () => {
      checkboxLabels.forEach((label, index) => {
        cy.get(selectorCheckbox.checkboxGroup)
          .find('label')
          .eq(index)
          .should('have.text', label);
      });
    });

    it('should check the checkbox when the label is clicked', () => {
      checkboxLabels.forEach((_, index) => {
        cy.get(selectorCheckbox.checkboxGroup).find('label').eq(index).click();
        cy.get(selectorCheckbox.checkboxGroup)
          .find('input[type="checkbox"]')
          .eq(index)
          .should('be.checked');
      });
    });
  });
});
