/// <reference types = "cypress" />
import loc from '../support/locators'
import '../support/commandsContas'

describe('Testando o Barriga React', () => {  

  before(() => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.login('almir.gg.nub@gmail.com', 'almir5566')
    // cy.get(loc.LOGIN.USER).type('almir.gg.nub@gmail.com')
    // cy.get(loc.LOGIN.PASSWORD).type('almir5566')
    // cy.get(loc.LOGIN.BTN_LOGIN).click()
    // cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
  })

  it.skip('Inserir conta', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta de Teste')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida')
  })

  it('Alteração de conta', () => {
    cy.resetAccounts()
    cy.acessarMenuConta()
    cy.inserirConta('Conta de Teste')
    cy.xpath(loc.ACCOUNTS.XP_BTN_ALTERAR).click()
    cy.get(loc.ACCOUNTS.NAME).type('{selectAll}Teste')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
  })

  it('Should not create an account with same name', () => {
    cy.acessarMenuConta()

    cy.get(loc.ACCOUNTS.NAME).type('Teste')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  })

  it('Add a movimentation', () => {
    cy.get(loc.MENU.MOVIMENTATION).click()
    cy.get(loc.MOVIMENTATION.POSITIVE_BUTTON).click()
    cy.get(loc.MOVIMENTATION.DESCRIPTION_MOVIMENTATION).type('Recebimento Aluguel')
    cy.get(loc.MOVIMENTATION.VALUE_MOVIMENTATION).type('500')
    cy.get(loc.MOVIMENTATION.INVOLVED).type('Seu Barriga')
    cy.get(loc.MOVIMENTATION.ACCOUNT).select('Teste')
    cy.get(loc.MOVIMENTATION.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida')

    cy.get(loc.EXTRACT.LINES).should('have.length', 7)
    cy.xpath(loc.EXTRACT.XP_SEARCH_ELEMENT).should('exist')
  })

})