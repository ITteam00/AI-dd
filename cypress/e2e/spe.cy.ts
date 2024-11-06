/// <reference types="cypress" />

describe('InputComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the initial result', () => {
    cy.get('.result-card mat-card-content').should('contain', '123');
  });

  it('should update the result when input is entered and enter is pressed', () => {
    const userInput = '测试输入';

    // Type into the input and press enter
    cy.get('input[matInput]').type(`${userInput}{enter}`);

    // Wait for the API call to complete and check the result is not empty
    cy.get('.result-card mat-card-content', { timeout: 20000 }).should(
      'not.be.empty'
    );
  });
});
