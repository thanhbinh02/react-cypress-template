const selectorTable = {
  antdTable: '[data-testid="antd-table"]',
  smallTable: '[data-testid="small-table"]',
  middleTable: '[data-testid="middle-table"]',
  expandableTable: '[data-testid="expandable-table"]',
  selectionTable: '[data-testid="selection-table"]',
  expandableNestedTable: '[data-testid="expandable-nested-table"]',
  nestedTable: '[data-testid="nested-table"]',
  ageCell: '[data-testid="age-cell"]',
};

describe('TableShowcasePage - AntD Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/table');
  });

  // Table Rendering Tests
  describe('Table rendering', () => {
    it('renders table with headers and data', () => {
      cy.get(selectorTable.antdTable).should('exist');
      cy.contains('th', 'Name');
      cy.contains('th', 'Age');
      cy.contains('th', 'Address');
      cy.contains('td', 'John');
      cy.contains('td', 'Jane');
    });

    it('renders table with small size', () => {
      cy.get(selectorTable.smallTable).should('exist');
      cy.get(selectorTable.smallTable).should('have.class', 'ant-table-small');
    });

    it('renders table with middle size', () => {
      cy.get(selectorTable.middleTable).should('exist');
      cy.get(selectorTable.middleTable).should('have.class', 'ant-table-middle');
    });

    it('shows custom rendered age', () => {
      cy.get(`${selectorTable.antdTable} td`).should('contain', 'years');
      cy.contains('td', '32 years');
      cy.contains('td', '28 years');
    });
  });

  // Sorting & Pagination Tests
  describe('Sorting & Pagination', () => {
    it('sorts by age correctly', () => {
      cy.contains('th', 'Age').click(); // Click sort ASC

      // Đợi DOM cập nhật sau sort
      cy.get(selectorTable.ageCell).first().should('have.text', '25 years');

      cy.contains('th', 'Age').click(); // Click sort DESC

      // Đợi DOM cập nhật sau sort
      cy.get(selectorTable.ageCell).first().should('have.text', '32 years');
    });

    it('shows pagination when enough rows', () => {
      cy.get('.ant-pagination').should('exist');
      cy.get('.ant-pagination-item').first().should('contain', '1');
    });

    it('checks number of rows equals data length', () => {
      cy.get(`${selectorTable.antdTable} tbody tr`).should('have.length', 2); // Vì pageSize = 2
    });
  });

  // Row Expansion & Selection Tests
  describe('Row Expansion & Selection', () => {
    it('expands row correctly', () => {
      cy.get(selectorTable.expandableTable).find('td').eq(0).click();
      cy.contains('Expanded content for John').should('exist');
    });

    it('selects rows correctly', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.get('input[type="checkbox"]').first().should('be.checked');
    });
  });

  // Nested Table Tests
  describe('Nested Table', () => {
    it('renders nested table when row is expanded', () => {
      cy.get(selectorTable.expandableNestedTable)
        .find('button[aria-label="Expand row"]')
        .first()
        .click();

      cy.get(selectorTable.nestedTable).should('exist');
      cy.get(`${selectorTable.nestedTable} tbody tr`).should('have.length', 2);
      cy.get(selectorTable.nestedTable).contains('td', '2024-01-01');
    });
  });
});
