/// <reference types = "cypress"/>



describe('Helpers...', () => {
  it('Wrap..', () => {

    const obj = {nome: 'user', idade: 20}

    expect(obj).to.have.property('nome')
    // O wrap encapsula o objeto comum e permite que seja usados os comandos do cypress
    cy.wrap(obj).should('have.property', 'nome')

    cy.visit('https://wcaquino.me/cypress/componentes.html')


    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500);
    })

    cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))
  })

  it.only('Its..', () => {
    //O >Its< permite capturar a propriedade de dentro do objeto
    const obj = {nome: 'user', idade: 20}
    cy.wrap(obj).its('nome').should('be.equal', 'user')

    const obj2 = {nome: 'user', idade: 20, endereco: {rua: 'dos bobos'}}
    cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
    
  })

  it.only('Invoke...', () => {

    //O invoke permite você pegar as propriedades de um objeto, seja ele um objeto de fato ou um elemento do html, entre outros..
    const getValue = () => 1;
    const soma = (a,b) => a + b;

    cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
    cy.wrap({fn: soma}).invoke('fn', 2,2).should('be.equal', 4)

    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.get('#resultado').invoke('html', '<input type="button" value= "hacked"/>')

  })

})

