/// <reference types="cypress" />

describe('Work with basic elements', () => {
  before(()=> {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {[
    cy.reload()
  ]})

  it('Text', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.get('.facilAchar').should('contain', 'Cuidado')
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  })

  it('Links', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.get('[href="#"]').click()
    cy.get('#resultado').should('have.text', 'Voltou!')

    cy.reload() //recarregar a pagina
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text', 'Voltou!')
    
  })

  it('Text fields', () => {
    cy.get('#formNome').type('teste');
    cy.get('#formNome').should('have.value', 'teste')

    cy.get('#elementosForm\\:sugestoes')
        .type('teste12345{backspace}')
        .should('have.value', 'teste1234')
    
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
          .type('teste12345{selectall}teste', { delay: 100})
          .should('have.value', 'teste')
    
  })

  it.only('Radio Buttons', () => {
    cy.get('#formSexoMasc')
      .click()
      .should('be.checked')

    cy.get('#formSexoFem').should('not.be.checked')

    cy.get('[name="formSexo"]').should('have.length', 2)
  })

  it.only('Checkbox', () => {
    cy.get('#formComidaCarne')
      .click()
      .should('be.checked')

      cy.reload()

      cy.get('[name="formComidaFavorita"]')
      .click({multiple:true})
      .should('be.checked')
  })

  it.only('Combo', () => {
    cy.get('[data-test=dataEscolaridade]')
      .select('2graucomp')
      .should('have.value', '2graucomp')

      //TODO Validar as opções do combo
  })

  it.only('Combo multiplies', () => {
    cy.get('[data-testid=dataEsportes]').select(['natacao', 'nada'])

    // TODO Validar as opções selecionadas do combo
  })

})