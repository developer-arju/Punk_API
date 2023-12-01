describe('Test app is working', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });


  // it('test button context changes', () => {
  //   cy.get('[data-cy=showBtn]').click()
  //   cy.get('[data-cy=showBtn]').contains("Close Grid")
  // })

  // it("test table has more than one row and column", () => {
  //   cy.get('[data-cy=showBtn]').click()
    
  //   cy.get(".k-table-tbody").find('tr').should('have.length.greaterThan', 0);
  //   cy.get('thead').find('tr:first-child').find('th').should('have.length.greaterThan', 0);
  
  // })


})