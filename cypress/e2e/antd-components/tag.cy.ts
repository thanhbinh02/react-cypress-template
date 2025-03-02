/// <reference types="cypress" />

describe('Ant Design Tag', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const inputSelectors = {
    tag: '[data-testid="antd-tag"]',
    closeButton: '[data-testid="antd-tag"] .ant-tag-close-icon',
  };

  const checkTagExists = () => {
    cy.get(inputSelectors.tag).should('exist').and('be.visible');
  };

  const checkTagText = (expectedText: string) => {
    cy.get(inputSelectors.tag).should('contain.text', expectedText);
  };

  const checkTagColor = (expectedColor: RegExp) => {
    cy.get(inputSelectors.tag).should('have.css', 'background-color').and('match', expectedColor);
  };

  it('should render the Tag with default values', () => {
    checkTagExists();
    checkTagText('Thẻ mẫu');
    checkTagColor(/rgb\((\d+), (\d+), (\d+)\)/);
  });

  it('should render the Tag without checking text', () => {
    checkTagExists();
    checkTagColor(/rgb\((\d+), (\d+), (\d+)\)/);
  });

  it('should render the Tag without checking color', () => {
    checkTagExists();
    checkTagText('Thẻ mẫu');
  });

  it('should show close button when closable is true', () => {
    cy.get(inputSelectors.closeButton).should('exist').and('be.visible');
  });

  it('should remove Tag when clicking close button', () => {
    cy.get(inputSelectors.closeButton).click();
    cy.get(inputSelectors.tag).should('have.class', 'ant-tag-hidden');
  });

  it('should show tooltip when hovered', () => {
    cy.get(inputSelectors.tag).trigger('mouseover');
    cy.get(inputSelectors.tag).should('have.attr', 'title').and('contain', 'Thẻ mẫu 2');
  });
});
