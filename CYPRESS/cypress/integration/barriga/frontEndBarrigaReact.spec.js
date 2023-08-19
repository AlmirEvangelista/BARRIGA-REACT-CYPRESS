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

  it('Add a movimentation', () => {

    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: 'fixture:accountMov'
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
    cy.xpath(loc.SALDO.FN_XP_BALANCE_VALUE('Inter')).should('contain', '100,00') 

    cy.route({
      method: 'GET',
      url: '/transacoes/1738168',
      response: {
        conta: "Conta para saldo",
        id: 1738168,
        descricao: "Movimentacao 1, calculo saldo",
        envolvido: "CCC",
        observacao: null,
        tipo: "REC",
        data_transacao: "2023-08-14T03:00:00.000Z",
        data_pagamento: "2023-08-14T03:00:00.000Z",
        valor: "3500.00",
        status: false,
        conta_id: 1855203,
        usuario_id: 39925,
        transferencia_id: null,
        parcelamento_id: null
    }

    })

    cy.route({
      method: 'PUT',
      url: '/transacoes/1738168',
      response: {
        "id": 1738168,
        "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2023-08-14T03:00:00.000Z",
        "data_pagamento": "2023-08-14T03:00:00.000Z",
        "valor": "3500.00",
        "status": true,
        "conta_id": 1855203,
        "usuario_id": 39925,
        "transferencia_id": null,
        "parcelamento_id": null
    }
    })

    cy.get(loc.MENU.EXTRACT).click()
    cy.xpath(loc.EXTRACT.FN_XP_BTN_CHANGE_MOV('Movimentacao 1, calculo saldo')).click()
    //cy.wait(1000)
    cy.get(loc.MOVIMENTATION.DESCRIPTION_MOVIMENTATION).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTATION.ACCOUNT).should('contain', 'Nubank')
    cy.get(loc.MOVIMENTATION.STATUS).click()
    cy.get(loc.MOVIMENTATION.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
    cy.get(loc.MENU.HOME).click()
    cy.get(loc.MENU.MOVIMENTATION).click()
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_BALANCE_VALUE('Inter')).should('contain', '100,00') 
  })

  it('Should remove a movimentation', () => {

    cy.get(loc.MENU.EXTRACT).click()

    cy.route({
      method: 'DELETE',
      url: 'transacoes/1738166',
      response: {},
      status: '204'
    }).as('del')


    cy.xpath(loc.EXTRACT.FN_XP_BTN_DELETE_MOV('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE).should('contain',  'sucesso')
  })

  it('Should validate data send to create an account', () => {

    const reqStub = cy.stub()

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
      ],
      onRequest: reqStub
      // onRequest: req => {
      //   expect(req.request.body.nome).to.be.empty
      //   // expect(req.request.headers).to.be.exist('Authorization')
      //   expect(req.request.headers).to.have.property('Authorization')
      // }
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

    cy.inserirConta('{CONTROL}')
    // cy.wait('@inserindoConta').its('request.body.nome').should('not.be.empty')
    cy.wait('@inserindoConta').then(() => {
      console.log(reqStub.args)
      expect(reqStub.args[0][0].request.body.nome).to.be.empty
      expect(reqStub.args[0][0].request.body.nome).to.have.property('Authorization') 
    })
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida')
  })


  it.only('Should test colors', () => {
    cy.route({
      method: 'GET', 
      url: '/extrato/**',
      response: [
        {
          conta: "Conta para movimentacoes",
          id: 1738166,
          descricao: "Receita paga",
            envolvido: "AAA",
            observacao: null,
            tipo: "REC",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "-1500.00",
            status: true,
            conta_id: 1855201,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
          },
          {
            conta: "Conta com movimentacao",
            id: 1738167,
            descricao: "Receita pendente",
            envolvido: "BBB",
            observacao: null,
            tipo: "REC",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "-1500.00",
            status: false,
            conta_id: 1855202,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
          },
          {
            conta: "Conta para saldo",
            id: 1738168,
            descricao: "Despesa paga",
            envolvido: "CCC",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "3500.00",
            status: true,
            conta_id: 1855203,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
          },
          {
            conta: "Conta para saldo",
            id: 1738169,
            descricao: "Despesa pendente",
            envolvido: "DDD",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "-1000.00",
            status: false,
            conta_id: 1855203,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
          }
        ]
      })
      cy.get(loc.MENU.EXTRACT).click()
      cy.xpath(loc.EXTRACT.XP_LINHA1).should('have.class', 'receitaPaga')
      cy.xpath(loc.EXTRACT.XP_LINHA2).should('have.class', 'receitaPendente')
      cy.xpath(loc.EXTRACT.XP_LINHA3).should('have.class', 'despesaPaga')
      cy.xpath(loc.EXTRACT.XP_LINHA4).should('have.class', 'despesaPendente')
  })

  it('Responsivity', () => {
    cy.get(loc.MENU.HOME).should('be.exist')
    cy.get(loc.MENU.HOME).should('be.visible')
    cy.viewport('iphone-5')
    cy.get(loc.MENU.HOME).should('be.exist')
    cy.get(loc.MENU.HOME).should('be.not.visible')
  })
  
})