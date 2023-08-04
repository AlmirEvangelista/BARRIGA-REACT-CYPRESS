/// <reference types="cypress" />

describe('Sincronismo', () => {

  before(()=> {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {[
    cy.reload()
  ]})


  it('aguardar...', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('aguardar')
  })

  it.only('Deve fazer retrys...', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo')
        .should('exist')
        .type('exist')
  })

  it.only('Uso do Find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 1')
    
    /* cy.get('#lista li')
      .find('span')
      .should('contain', 'Item 2')  // da erro pois tem um delay pra aparecer o item 2 e o find fica verificando através do span "item 1"
    */
    cy.get('#lista li')
      .should('contain', 'Item 2')
    
  })

  it.only('Uso do TimeOut', () => {
    // cy.get('#buttonDelay').click()
    // cy.get('#novoCampo').should('exist')

    // cy.get('#buttonListDOM').click()
    // cy.wait(5000)
    // cy.get('#novoCampo').should('exist')

    cy.get('#buttonListDOM').click()
    cy.get('#lista li span')
        .should('have.length', 1)
    cy.get('#lista li span')
        .should('have.length', 2)

  })

  it.only('Click retry', () => {
    cy.get('#buttonCount')
        .click()
        .should('have.value', '11')  //caso fosse '1' tb funcionaria e caso fosse '111' não funcionaria pois o click só tem 1 retry
  })


  it.only('Should vs Then', ()=> {
    // cy.get('#buttonListDOM').click()
    // cy.get('#lista li span').should($el => {  // o should vai fzr retry até o $el chegar e o then vai esperar chegar e fazer a assertiva
    //   console.log('$el')
    //   expect($el).to.have.length(1);
    // })

    cy.get('#buttonListDOM').should($el => {   // o should ignora os returns e vai pro elemento que ele recebe como parametro no caso o $el
      expect($el).to.have.length(1);
      return 2

    }).and('have.id', 'buttonListDOM')
  })


  cy.get('#buttonListDOM').then($el => {   // o should ignora os returns e vai pro elemento que ele recebe como parametro no caso o $el
    expect($el).to.have.length(1);
    return 2

  }).and('eq', 2)
  .and('have.id', 'buttonListDOM')



})