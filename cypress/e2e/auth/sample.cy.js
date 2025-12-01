describe('Sample Test', () => {
  it('should visit homepage', () => {
    cy.visit('/');
    cy.get('h1').should('be.visible');
  });
});
