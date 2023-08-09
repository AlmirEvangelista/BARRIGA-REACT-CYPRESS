/// <reference types = "cypress" />

describe('Testando o Barriga React', () => {  

  before(() => {
    // cy.visit('https://barrigareact.wcaquino.me/')
    // cy.login('almir.gg.nub@gmail.com', 'almir5566')
  })

  beforeEach(() => {
    // cy.resetAccounts()
  })

  it('Insert account', () => {
    cy.request({
      method: 'POST',
      url: 'https://barrigarest.wcaquino.me/signin',
      body: {email: "almir.gg.nub@gmail.com", senha: "almir5566", redirecionar: false}
    }).its('body.token').should('not.be.empty').
    then(token => {
      
      cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/contas',
        headers: {Authorization: `JWT ${token}`},
        body: {
          nome: 'Conta via rest'
        }
      }).as('response')

    })

    cy.get('@response').then(res => {
      expect(res.status).equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
    

  })

  it('Account change', () => {
    
  })

  it('Should not create an account with same name', () => {
   
  })

  it('Add a movimentation', () => {
   
  })

  it('Check balance', () => {
   
  })

  it('Should remove a movimentation', () => {
  
  })

})