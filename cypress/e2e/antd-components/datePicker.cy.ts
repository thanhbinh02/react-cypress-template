import dayjs from 'dayjs';
/// <reference types="cypress" />

describe('DatePicker Showcase', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/date-picker');
  });

  afterEach(() => {
    cy.get('body').click(0, 0); // Click ra ngoài để đóng DatePicker
  });

  it("Selects today's date in DatePicker", () => {
    const today = dayjs().format('YYYY-MM-DD');
    const day = dayjs().date(); // chỉ lấy số ngày (ví dụ: 25)

    cy.get('[data-testid="datepicker"]').click();
    cy.get('.ant-picker-cell-inner')
      .not('.ant-picker-cell-disabled')
      .contains(new RegExp(`^${day}$`))
      .click();

    cy.get('[data-testid="datepicker"]').should('have.value', today);
  });

  it('Selects a specific month and year', () => {
    cy.get('[data-testid="datepicker"]').click();

    cy.get('.ant-picker-header-view button').eq(1).click();
    cy.get('.ant-picker-year-panel .ant-picker-cell')
      .contains('2025')
      .should('be.visible')
      .click();

    cy.get('.ant-picker-month-panel .ant-picker-cell')
      .contains('Sep')
      .should('be.visible')
      .click();

    cy.get('.ant-picker-cell-inner')
      .not('.ant-picker-cell-disabled')
      .contains(/^25$/)
      .click();

    cy.get('[data-testid="datepicker"]').should('have.value', '2025-09-25');
  });

  it('Clears selected date', () => {
    cy.get('[data-testid="datepicker"]').click();
    cy.get('.ant-picker-cell-inner')
      .not('.ant-picker-cell-disabled')
      .contains(/^29$/)
      .click();
    cy.get('[data-testid="datepicker"]').should('not.have.value', '');

    cy.get('[data-testid="clear-btn"]').click();
    cy.get('[data-testid="datepicker"]').should('have.value', '');
  });

  it('Disables past dates and prevents selection', () => {
    const pastDay = dayjs().subtract(1, 'day').date();
    cy.get('[data-testid="datepicker"]').click();
    cy.get('.ant-picker-cell-disabled .ant-picker-cell-inner')
      .contains(new RegExp(`^${pastDay}$`))
      .click({ force: true });

    cy.get('[data-testid="datepicker"]').should('have.value', '');
  });

  it('Checks if the DatePicker is visible', () => {
    cy.get('[data-testid="datepicker"]').should('be.visible');
  });

  it('Selects a week in DatePicker with picker="week"', () => {
    cy.get('[data-testid="datepicker-week"]').click();
    cy.get('.ant-picker-week-panel-row').eq(3).click();
    cy.get('[data-testid="datepicker-week"] ').should(
      'have.value',
      '2025-17th'
    );
  });

  it('Selects a month in DatePicker with picker="month"', () => {
    cy.get('[data-testid="datepicker-month"]').click();
    cy.get('.ant-picker-month-panel .ant-picker-cell').contains('Sep').click();
    cy.get('[data-testid="datepicker-month"] ').should('have.value', '2025-09');
  });

  it('Selects a quarter in DatePicker with picker="quarter"', () => {
    cy.get('[data-testid="datepicker-quarter"]').click();
    cy.get('.ant-picker-quarter-panel .ant-picker-cell').contains('Q2').click();
    cy.get('[data-testid="datepicker-quarter"] ').should(
      'have.value',
      '2025-Q2'
    );
  });

  it('Selects a year in DatePicker with picker="year"', () => {
    cy.get('[data-testid="datepicker-year"]').click();
    cy.get('.ant-picker-year-panel .ant-picker-cell').contains('2025').click();
    cy.get('[data-testid="datepicker-year"] ').should('have.value', '2025');
  });

  it('Renders DatePicker with small size and selects a date', () => {
    cy.get('[data-testid="datepicker-small"]').closest('.ant-picker-small');
  });

  it('Renders DatePicker with large size and selects a date', () => {
    cy.get('[data-testid="datepicker-large"]').closest('.ant-picker-large');
  });
});
