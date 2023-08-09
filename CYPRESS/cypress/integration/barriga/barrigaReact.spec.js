/// <reference types = "cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testando o Barriga React', () => {  

  before(() => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.login('almir.gg.nub@gmail.com', 'almir5566')
    // cy.get(loc.LOGIN.USER).type('almir.gg.nub@gmail.com')
    // cy.get(loc.LOGIN.PASSWORD).type('almir5566')
    // cy.get(loc.LOGIN.BTN_LOGIN).click()
    // cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
  })

  beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
    cy.resetAccounts()
  })

  it('Insert account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta de Teste')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida')
  })

  it('Account change', () => {
    cy.acessarMenuConta()
    cy.xpath(loc.ACCOUNTS.XP_BTN_ALTERAR).click()
    cy.get(loc.ACCOUNTS.NAME).type('{selectAll}Teste')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
  })

  it('Should not create an account with same name', () => {
    cy.acessarMenuConta()

    cy.get(loc.ACCOUNTS.NAME).type('Conta mesmo nome')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  })

  it('Add a movimentation', () => {
    cy.get(loc.MENU.MOVIMENTATION).click()
    cy.get(loc.MOVIMENTATION.POSITIVE_BUTTON).click()
    cy.get(loc.MOVIMENTATION.DESCRIPTION_MOVIMENTATION).type('Recebimento Aluguel')
    cy.get(loc.MOVIMENTATION.VALUE_MOVIMENTATION).type('500')
    cy.get(loc.MOVIMENTATION.INVOLVED).type('Seu Barriga')
    cy.get(loc.MOVIMENTATION.ACCOUNT).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTATION.STATUS).click()
    cy.get(loc.MOVIMENTATION.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida')

    cy.get(loc.EXTRACT.LINES).should('have.length', 7)
    cy.xpath(loc.EXTRACT.FN_XP_SEARCH_ELEMENT('Aluguel', '500')).should('exist')
  })

  it('Check balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_BALANCE_VALUE('Conta para saldo')).should('contain', '534') 

    cy.get(loc.MENU.EXTRACT).click()
    cy.xpath(loc.EXTRACT.FN_XP_BTN_CHANGE_MOV('Movimentacao 1, calculo saldo')).click()
    //cy.wait(1000)
    cy.get(loc.MOVIMENTATION.DESCRIPTION_MOVIMENTATION).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTATION.ACCOUNT).should('contain', 'Conta para saldo')
    cy.get(loc.MOVIMENTATION.STATUS).click()
    cy.get(loc.MOVIMENTATION.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
    cy.get(loc.MENU.HOME).click()
    cy.get(loc.MENU.MOVIMENTATION).click()
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_BALANCE_VALUE('Conta para saldo')).should('contain', '4.034,00') 
  })

  it('Should remove a movimentation', () => {
    cy.get(loc.MENU.EXTRACT).click()
    cy.xpath(loc.EXTRACT.FN_XP_BTN_DELETE_MOV('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE).should('contain',  'sucesso')
  })

})