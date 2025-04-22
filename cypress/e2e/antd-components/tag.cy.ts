/// <reference types="cypress" />

const selectors = {
  tagContainer: '[data-testid="tag-container"]',
  tag: '[data-testid^="tag-"]',
  tagInput: '[data-testid="tag-input"]',
  addTagButton: '[data-testid="add-tag-btn"]',
  closeIcon: '.ant-tag-close-icon',
};

const colors = {
  successTagBg: 'rgb(246, 255, 237)',
  errorTagBg: 'rgb(255, 242, 240)',
  linkColor: 'rgba(0, 0, 0, 0.88)',
};

const getTags = () => cy.get(`${selectors.tagContainer} ${selectors.tag}`);

const getTagByText = (text: string) =>
  cy.contains(`${selectors.tagContainer} ${selectors.tag}`, text);

const closeAllClosableTags = () => {
  cy.get(selectors.closeIcon).each((icon) => cy.wrap(icon).click());
};

const addTag = (text: string) => {
  cy.get(selectors.tagInput).clear().type(text);
  cy.get(selectors.addTagButton).click();
};

describe('Ant Design Tag Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/tag');
  });

  it('renders all initial tags with closable functionality', () => {
    getTags().should('have.length', 6);
    getTagByText('Success Tag').should('exist');
    getTagByText('Error Tag').should('exist');
    getTagByText('Processing').should('exist');
    getTagByText('Link').should('exist');
    getTagByText('Icon').should('exist');
    // Ensure all closable tags (by default)
    getTagByText('Success Tag').find('.ant-tag-close-icon').should('exist');
    getTagByText('Processing').find('.ant-tag-close-icon').should('exist');
    getTagByText('Link').find('.ant-tag-close-icon').should('exist');
    getTagByText('Icon').find('.ant-tag-close-icon').should('exist');
  });

  it('removes a closable tag on close icon click', () => {
    getTags().should('have.length', 6);
    getTags().eq(0).find('.ant-tag-close-icon').click();
    getTags().should('have.length', 5);
  });

  it('non-closable tag should not have close icon', () => {
    getTagByText('Error Tag').find('.ant-tag-close-icon').should('not.exist');
  });

  it('adds a new tag dynamically with closable functionality', () => {
    addTag('New Dynamic Tag');
    getTagByText('New Dynamic Tag').should('exist');
    getTags().should('have.length', 7);
    // Ensure the new tag is closable by default
    getTagByText('New Dynamic Tag').find('.ant-tag-close-icon').should('exist');
  });

  it('does not add empty tag', () => {
    cy.get('[data-testid="add-tag-btn"]').click();
    getTags().should('have.length', 6);
  });

  it('supports adding multiple tags with closable functionality', () => {
    const newTags = ['One', 'Two', 'Three'];
    newTags.forEach(addTag);

    newTags.forEach((tag) => {
      getTagByText(tag).should('exist');
      // Ensure each new tag is closable by default
      getTagByText(tag).find('.ant-tag-close-icon').should('exist');
    });

    getTags().should('have.length', 9);
  });

  it('should apply correct background color for status tags', () => {
    getTagByText('Success Tag')
      .should('have.css', 'background-color')
      .and('eq', colors.successTagBg);

    getTagByText('Error Tag')
      .should('have.css', 'background-color')
      .and('eq', colors.errorTagBg);
  });

  it('should allow closing all closable tags', () => {
    closeAllClosableTags();
    getTags().should('have.length', 1);
  });

  it('should navigate when clicking on link tag', () => {
    getTagByText('Link')
      .find('a')
      .should('have.attr', 'href', 'google.com')
      .and('have.attr', 'target', '_blank');
  });

  it('should render tag with custom close icon and allow closing it', () => {
    getTagByText('Icon').find('.anticon-close').should('exist').click();
    getTags().should('have.length', 5);
  });

  it('should render tag with custom Twitter close icon and allow closing it', () => {
    getTagByText('Icon Tag')
      .should('exist')
      .find('.anticon.anticon-twitter')
      .should('exist')
      .find('svg')
      .should('have.attr', 'viewBox')
      .and('match', /64 64 896 896/);

    getTagByText('Icon Tag').find('.anticon-close').click();

    getTags().should('have.length', 5);
  });
});
