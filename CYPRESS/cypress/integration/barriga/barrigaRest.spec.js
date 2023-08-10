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
        headers: {Authorization: `JWT ${token}`},
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
    
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: {Authorization: `JWT ${token}`},
      qs: {
        nome: 'Conta para alterar'
      }
    }).then(res => {

      cy.request({
        url: `/contas/${res.body[0].id}`,
        method: 'PUT',
        headers: {Authorization: `JWT ${token}`},
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
      headers: {Authorization: `JWT ${token}`},
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
   
  })

  it('Check balance', () => {
   
  })

  it('Should remove a movimentation', () => {
  
  })

})