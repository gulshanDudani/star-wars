describe('Character Details Page', () => {
    beforeEach(() => {
      cy.visit('/details/1'); 
    });
  
    it('should display character details correctly', () => {
      cy.get('#name').should('contain.text', 'Luke Skywalker'); 
      cy.get('#hair_color').should('contain.text', 'blond');
      cy.get('#eye_color').should('contain.text', 'blue'); 
      cy.get('#gender').should('contain.text', 'male');
      cy.get('#homePlanet').should('contain.text', 'Tatooine');
      cy.get('#filmTitle').should('exist');

    });
  
  
    it('should allow adding the character to the favourites list', () => {
      cy.get('.character-wrapper button').contains('Add').click();
      cy.get('.character-wrapper button').should('not.exist');
    });
  });