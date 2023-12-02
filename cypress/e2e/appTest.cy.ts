describe('Test app is working', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it("if filter check-box is false check the value shown below eight", () => {
    cy.get('[data-cy=filterToggle]').uncheck({force: true})

    cy.get('tbody')
    .find('tr')
    .should('have.length.greaterThan', 0)
    .each(($tr) => {

      cy.wrap($tr)
        .find('td:nth-child(3)')
        .invoke('text')
        .then((textContent) => {
          const value = parseFloat(textContent);
          expect(value).to.be.lessThan(8);
        });
    });
  })
  it("if filter check-box is true check the value shown above eight", () => {
    cy.get('[data-cy=filterToggle]').check({force: true})

    cy.get('tbody')
    .find('tr')
    .should('have.length.greaterThan', 0)
    .each(($tr) => {

      cy.wrap($tr)
        .find('td:nth-child(3)')
        .invoke('text')
        .then((textContent) => {
          const value = parseFloat(textContent);
          expect(value).to.be.greaterThan(8);
        });
    });
  })
  
  

})