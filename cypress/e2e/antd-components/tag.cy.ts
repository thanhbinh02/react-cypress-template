/// <reference types="cypress" />

const selectorsTag = {
  tagContainer: '[data-testid="tag-container"]',
  tag: '[data-testid^="tag-"]',
  tagInput: '[data-testid="tag-input"]',
  addTagButton: '[data-testid="add-tag-btn"]',
  closeIcon: '.ant-tag-close-icon',
};

const colors = {
  successTagBg: 'rgb(246, 255, 237)',
  errorTagBg: 'rgb(255, 242, 240)',
  processingTagBg: 'rgb(230, 244, 255)',
  warningTagBg: 'rgb(255, 251, 230)',
  defaultTagBg: 'rgb(250, 250, 250)',
  linkColor: 'rgba(0, 0, 0, 0.88)',
};

const getTags = () =>
  cy.get(`${selectorsTag.tagContainer} ${selectorsTag.tag}`);

const getTagByText = (text: string) =>
  cy.contains(`${selectorsTag.tagContainer} ${selectorsTag.tag}`, text);

const closeAllClosableTags = () => {
  cy.get(selectorsTag.closeIcon).each((icon) => cy.wrap(icon).click());
};

const addTag = (text: string) => {
  cy.get(selectorsTag.tagInput).clear().type(text);
  cy.get(selectorsTag.addTagButton).click();
};

describe('Ant Design Tag Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/tag');
  });

  describe('Initial Rendering and Basic Functionality', () => {
    it('renders all initial tags with closable functionality', () => {
      getTags().should('have.length', 8);
      getTagByText('Success').should('exist');
      getTagByText('Error').should('exist');
      getTagByText('Processing').should('exist');
      getTagByText('Link').should('exist');
      getTagByText('Icon').should('exist');
      // Ensure all closable tags (by default)
      getTagByText('Success').find('.ant-tag-close-icon').should('exist');
      getTagByText('Processing').find('.ant-tag-close-icon').should('exist');
      getTagByText('Link').find('.ant-tag-close-icon').should('exist');
      getTagByText('Icon').find('.ant-tag-close-icon').should('exist');
    });

    it('non-closable tag should not have close icon', () => {
      getTagByText('Error').find('.ant-tag-close-icon').should('not.exist');
    });
  });

  describe('Tag Manipulation', () => {
    it('removes a closable tag on close icon click', () => {
      getTags().should('have.length', 8);
      getTags().eq(0).find('.ant-tag-close-icon').click();
      getTags().should('have.length', 7);
    });

    it('adds a new tag dynamically with closable functionality', () => {
      addTag('New Dynamic Tag');
      getTagByText('New Dynamic Tag').should('exist');
      getTags().should('have.length', 9);
      // Ensure the new tag is closable by default
      getTagByText('New Dynamic Tag')
        .find('.ant-tag-close-icon')
        .should('exist');
    });

    it('does not add empty tag', () => {
      cy.get('[data-testid="add-tag-btn"]').click();
      getTags().should('have.length', 8);
    });

    it('supports adding multiple tags with closable functionality', () => {
      const newTags = ['One', 'Two', 'Three'];
      newTags.forEach(addTag);

      newTags.forEach((tag) => {
        getTagByText(tag).should('exist');
        // Ensure each new tag is closable by default
        getTagByText(tag).find('.ant-tag-close-icon').should('exist');
      });

      getTags().should('have.length', 11);
    });

    it('should allow closing all closable tags', () => {
      closeAllClosableTags();
      getTags().should('have.length', 4);
    });
  });

  describe('Appearance and Styling', () => {
    it('should apply correct background color for status tags', () => {
      getTagByText('Success')
        .should('have.css', 'background-color')
        .and('eq', colors.successTagBg);

      getTagByText('Error')
        .should('have.css', 'background-color')
        .and('eq', colors.errorTagBg);

      getTagByText('Processing')
        .should('have.css', 'background-color')
        .and('eq', colors.processingTagBg);

      getTagByText('Warning')
        .should('have.css', 'background-color')
        .and('eq', colors.warningTagBg);

      getTagByText('Default')
        .should('have.css', 'background-color')
        .and('eq', colors.defaultTagBg);
    });
  });

  describe('Special Tags', () => {
    it('should navigate when clicking on link tag', () => {
      getTagByText('Link')
        .find('a')
        .should('have.attr', 'href', 'google.com')
        .and('have.attr', 'target', '_blank');
    });

    it('should render tag with custom close icon and allow closing it', () => {
      getTagByText('Icon').find('.anticon-close').should('exist').click();
      getTags().should('have.length', 7);
    });

    it('should render tag with custom Twitter close icon and allow closing it', () => {
      getTagByText('Icon Tag')
        .should('exist')
        .find('.anticon.anticon-twitter')
        .should('exist')
        .find('svg')
        .should('have.attr', 'viewBox')
        .and('match', /64 64 896 896/);
    });
  });
});
