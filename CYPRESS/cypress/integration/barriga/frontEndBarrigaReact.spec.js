/// <reference types = "cypress" />
import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Testando o Barriga React', () => {  

  // afterEach(() => {
  //     cy.clearLocalStorage()
  // })

  beforeEach(() => {
    buildEnv()
    cy.login('almir.gg.nub@gmail.com', 'almir5566')
    cy.get(loc.MENU.HOME).click()
  })

  it('Insert account', () => {

    cy.route({
      method: 'POST',
      url: '/contas',
      response: [
        {
            id: 3,
            nome: "Conta de teste",
            visivel: true,
            usuario_id: 39925
        }
      ]
    }).as('inserindoConta')


    cy.acessarMenuConta()

    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        {
            id: 1,
            nome: "Nubank",
            visivel: true,
            usuario_id: 39925
        },
        {
          id: 2,
          nome: "Inter",
          visivel: true,
          usuario_id: 39925
        },
        {
          id: 3,
          nome: 'Conta de Teste',
          visivel: true,
          usuario_id: 39925
       }      
      ]
    }).as('contaSave')

    cy.inserirConta('Conta de Teste')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida')
  })

  it('Account change', () => {

    cy.route({
      method: 'PUT',
      url: '/contas/**',
      response: {id:1855088, nome:"Nubank1", visivel:true, usuario_id:39925}
    })

    cy.acessarMenuConta()
    cy.xpath(loc.ACCOUNTS.XP_BTN_ALTERAR2).click()
    cy.get(loc.ACCOUNTS.NAME).type('{selectAll}Teste')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
  })

  it('Should not create an account with same name', () => {
    cy.acessarMenuConta()

    cy.route({
      method: 'POST',
      url: '/contas',
      response: {id: 1, nome:"Nubank", visivel:true, usuario_id:39925},
      status: '400'
    })

    cy.get(loc.ACCOUNTS.NAME).type('Nubank')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  })

  it.only('Add a movimentation', () => {

    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: {
        id: 1,
        descricao: "Recebimento Aluguel",
        envolvido: "Seu Barriga",
        observacao: null,
        tipo: "REC",
        data_transacao: "2023-08-14T03:00:00.000Z",
        data_pagamento: "2023-08-14T03:00:00.000Z",
        valor: "500.00",
        status: true,
        conta_id: 1,
        usuario_id: 39925,
        transferencia_id: null,
        parcelamento_id: null
    }
    })

    

    cy.get(loc.MENU.MOVIMENTATION).click()
    cy.get(loc.MOVIMENTATION.POSITIVE_BUTTON).click()
    cy.get(loc.MOVIMENTATION.DESCRIPTION_MOVIMENTATION).type('Recebimento Aluguel')
    cy.get(loc.MOVIMENTATION.VALUE_MOVIMENTATION).type('500')
    cy.get(loc.MOVIMENTATION.INVOLVED).type('Seu Barriga')
    cy.get(loc.MOVIMENTATION.ACCOUNT).select('Nubank')
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