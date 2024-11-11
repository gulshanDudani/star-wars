describe('Favourites List Page', () => {
    beforeEach(() => {
      cy.visit('/details/1');
      cy.get('.character-wrapper button').contains('Add').click(); 
      cy.visit('/favourites');
    });
  
    it('should display characters added to favourites', () => {
      cy.get('.favourite-details').should('have.length.greaterThan', 0); 
    });
    it('should allow removing a character from favourites', () => {
      cy.get('.remove-btn').first().click();
      cy.get('.remove-btn').should('not.exist'); 
    });
  });