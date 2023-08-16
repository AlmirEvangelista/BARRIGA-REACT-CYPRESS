/// <reference types = "cypress" />

describe('Testando o Barriga React', () => {  

  let token

  before(() => {
    cy.getToken('almir.gg.nub@gmail.com', 'almir5566').then(tkn => {
      token = tkn
    })
  })

  beforeEach(() => {
    cy.resetRest(token)
  })

  it('Insert account', () => {
      
      cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/contas',
        // headers: {Authorization: `JWT ${token}`},
        body: {
          nome: 'Conta via rest'
        }
      }).as('response')

  
    cy.get('@response').then(res => {
      expect(res.status).equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })

  })



  it('Account change', () => {
    
   cy.getIdAccount('Conta para alterar')
    .then(accountId => {

      cy.request({
        url: `/contas/${accountId}`,
        method: 'PUT',
        // headers: {Authorization: `JWT ${token}`},
        body: {
          nome: 'Conta alterada via rest'
        }
      }).as('response')

      cy.get('@response').its('status').should('be.equal', 200)

    })



  })

  it('Should not create an account with same name', () => {
   
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/contas',
      // headers: {Authorization: `JWT ${token}`},
      body: {
        nome: 'Conta mesmo nome'
      },
      failOnStatusCode: false
    }).as('response')


  cy.get('@response').then(res => {
    expect(res.status).equal(400)
    expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
  })


  })

  it('Add a movimentation', () => {

    cy.getIdAccount('Conta para movimentacoes')
    .then(accountId => {

      cy.request({
        method: 'POST',
        url: '/transacoes',
        // headers: {Authorization: `JWT ${token}`},
        body: {
          conta_id: accountId,
          data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
          data_transacao: Cypress.moment().format('DD/MM/YYYY'),
          descricao: "Recebimento Aluguel",
          envolvido: "Seu Barriga",
          status: true,
          tipo: "REC",
          valor: "500"
        }
      }).as('response')

      cy.get('@response').its('status').should('be.equal', 201)
      cy.get('@response').its('body.id').should('exist')


    })

  })

  it('Check balance', () => {

    cy.request({
      url: '/saldo',
      method: 'GET',
      // headers: {Authorization: `JWT ${token}`}
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if(c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('534.00')

    })

   

      cy.request({
      method: 'GET',
      url: '/transacoes',
      // headers: {Authorization: `JWT ${token}`},
      qs: {
        descricao: 'Movimentacao 1, calculo saldo'
      }
    }).then(res => {  
      
    cy.request({
      method: 'PUT',
      url: `/transacoes/${res.body[0].id}`,
      // headers: {Authorization: `JWT ${token}`},
      body: 
        {
          descricao: res.body[0].descricao,
          envolvido: "CCC",
          data_transacao: Cypress.moment(res.body.data_transacao).format('DD/MM/YYYY'),
          data_pagamento: Cypress.moment(res.body.data_pagamento).format('DD/MM/YYYY'),
          valor: res.body[0].valor,
          status: true,
          conta_id: res.body[0].conta_id,
      }
      

    }).its('status').should('be.equal', 200)

  })


      cy.request({
      url: '/saldo',
      method: 'GET',
      // headers: {Authorization: `JWT ${token}`}
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if(c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('4034.00')

    })  

   })

  it('Should remove a movimentation', () => {
    cy.request({
      url: '/transacoes',
      method: 'GET',
      // headers: {Authorization: `JWT ${token}`},
      qs: {
        descricao: 'Movimentacao para exclusao'
      }
    })
    .then(res => {
      cy.request({
        method: 'DELETE',
        url: `/transacoes/${res.body[0].id}`,
        // headers: {Authorization: `JWT ${token}`},
      }).its('status').should('be.equal', 204)
    })


  })

})