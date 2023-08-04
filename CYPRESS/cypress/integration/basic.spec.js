/// <reference types = "cypress"/>

describe('Cypress basics', () => {
  it('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.title().should('be.equal', 'Campo de Treinamento')
              .and('contain', 'Campo')

    cy.title().then(title => {
      console.log(title)
    })
  })

  it('Should find and interact with an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
     
    cy.get('#buttonSimple')
          .click()
          .should('have.value', 'Obrigado!')
  })

  // it('Should find and interact with the button zZz', () => {
  //   cy.visit('https://wcaquino.me/cypress/componentes.html')

  //   cy.get('#buttonLazy')
  //     .click()
  //     .should('have.value', 'zZz ZzZ!').debug()
  // })
})

// cy.pause (pausa o fluxo) e cy.debug (mostra os detalhes do código)
