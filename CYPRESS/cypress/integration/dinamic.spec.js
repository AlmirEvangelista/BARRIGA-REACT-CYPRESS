/// <reference types="cypress" />

describe('dinamic tests', () => {
  
  beforeEach(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })


  

    const foods = ['carne', 'frango', 'pizza', 'vegetariano']

    foods.forEach(food => {

    it(`Teste dinâmico para a comida: ${food} `, () => {

    cy.get('#formNome').type('Almir')
    cy.get('[data-cy=dataSobrenome]').type('Evangelista')
    cy.get(`[name=formSexo][value="M"]`).click()
    cy.get(`[name=formComidaFavorita][value=${food}]`).click()
    cy.get('[data-test=dataEscolaridade]').select('Mestrado')
    cy.get('[data-testid=dataEsportes]').select('Futebol')  

    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

  })

  })

  it.only('Deve selecionar todos usando o each', () => {

    cy.get('#formNome').type('Almir')
    cy.get('[data-cy=dataSobrenome]').type('Evangelista')
    cy.get(`[name=formSexo][value="M"]`).click()

    cy.get(`[name=formComidaFavorita]`).each($el => {
      if($el.val() != 'vegetariano'){
        cy.wrap($el).click()
      }
    })

    cy.get('[data-test=dataEscolaridade]').select('Mestrado')
    cy.get('[data-testid=dataEsportes]').select('Futebol')  

    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

  })





})
