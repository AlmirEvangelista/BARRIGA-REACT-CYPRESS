/// <reference types = "cypress" />

describe('Work with time', () => {

  it('Going back to the past', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    const dt = new Date(2001,3,26,16,0,0)

    cy.clock(dt.getTime())

    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '26/04/2001')
  })

  it.only('Goes to the future', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.clock()
    cy.get('#buttonTimePassed').click()
    cy.tick(5000) //o tick altera o clock
    cy.get('#resultado > span').invoke('text').should('lte', 1000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').should('gte', 5000)
    cy.tick(5000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').should('gte', 10000)



  })


})