
describe('Character List Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load characters from the API and display them', () => {
      cy.get('.table-row').should('have.length.greaterThan', 0); 
    });
  
    it('should paginate through character pages', () => {
      cy.get('.next-page').click();
      cy.wait(500);
      cy.get('.prev-page').should('not.be.disabled'); 
    });
  
    it('should allow searching by character name', () => {
      cy.get('input[type="text"]').type('Luke');
      cy.get('.table-row').should('have.length', 1);
      cy.get('.table-row').first().contains('Luke Skywalker');
    });
  
    it('should navigate to character details page on click', () => {
      cy.get('.table-row button').first().click(); 
      cy.url().should('include', '/details/'); 
    });
  });
  