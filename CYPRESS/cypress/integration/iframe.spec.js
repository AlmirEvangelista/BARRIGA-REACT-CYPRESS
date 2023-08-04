/// <reference types="cypress"/>


describe('Work with Alerts', () => {
  before(()=> {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {[
    cy.reload()
  ]})

  it('iFrame', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#frame1').then(iframe => {
      const body = iframe.contents().find('body')
      cy.wrap(body).find('#tfield')
        .type('funciona?')
        .should('have.value', 'funciona?')
    })
    
  })

  it.only('iFrame 2', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html')

    cy.get('#otherButton').click()
    cy.on("window:alert", msg => {
      expect(msg).to.be.equal('Click OK!')
    })

  })

})