/// <reference types="cypress"/>


describe('Work with Alerts', () => {
  before(()=> {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  })

  beforeEach(() => {[
    cy.reload()
  ]})

  it.only('Alerts', () => {
    // cy.get('#alert').click()
    // cy.on('window:alert', msg => {
    //   console.log(msg)
    //   expect(msg).to.be.equal('Alert Simples')
    // })

    cy.clickAlert('#alert', 'Alert Simples')
  })

  it('Alert with mock', () => {
    const stub = cy.stub().as('Alert')

    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
    })
  })

  it('Confirm', () => {
    const stub = cy.stub()

    cy.on('window:confirm', stub)
    cy.on('window:alert', stub)
    cy.get('#confirm').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Confirm Simples')
      expect(stub.getCall(1)).to.be.calledWith('Confirmado')
    })
  })

  it('Deny', () => {

    cy.on('window:confirm', msg => {
      expect(msg).to.be.equal('Confirm Simples')
      return false
    })
    cy.on('window:alert', msg1 => {
      expect(msg1).to.be.equal('Negado')
    })

    cy.get('#confirm').click()

  })

  it('Prompt', () => {
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('42')

      cy.on("window:confirm", msg => {
        expect(msg).to.be.equal('Era 42?')
      })

      cy.on("window:alert",  msg => {
        expect(msg).to.be.equal(':D')
      })

      cy.get('#prompt').click()

    })
  })

  it('Desafio', () => {

    const stub = cy.stub()


    cy.on('window:alert', stub)
    cy.get('#formCadastrar').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
    })
    

    cy.get('#formNome').type('Almir')
    cy.get('#formCadastrar').click().then(() => {
      expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
    })

    cy.get('[data-cy=dataSobrenome]').type('Evangelista')
    cy.get('#formCadastrar').click().then(() => {
      expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
    })

    cy.get('#formSexoMasc').click()
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')

  })

})