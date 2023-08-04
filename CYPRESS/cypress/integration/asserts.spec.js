/// <reference types="cypress" />

it('Equality', () => {
  const a = 1;
  expect(a).equal(1);
  expect(a).to.be.equal(1);
})


it('Truthy', () => {
  const a =  true;
  const b =  null;
  let c;

  expect(a).to.be.true;
  expect(b).to.be.null;
  expect(c).to.be.undefined
  expect(a).to.be.not.null;
})

it('Object Equality', () => {
  const obj = {
    a: 1,
    b: 2
  }

  expect(obj).to.be.equal(obj);
  expect(obj).to.be.equals(obj);
  expect(obj).to.be.equal(obj);
  expect(obj).to.be.deep.equal({a:1, b:2 }); // verifica propriedades do objeto
  expect(obj).to.be.eql({a:1, b:2}); //forma resumida do codigo acima
  expect(obj).to.be.include({a:1});
  expect(obj).to.have.property('b');
  expect(obj).to.have.property('b', 2);
  expect(obj).to.not.be.empty;
  expect({}).to.be.empty;
})

it('Arrays', () => {
  const arr = [1,2,3];

  expect(arr).to.have.members([1,2,3]);
  expect(arr).to.include.members([1,3]);
  expect(arr).to.be.not.empty;
  expect([]).empty;
})

it('Types', ()=>{
  const num = 1;
  const str = "String"

  expect(num).to.be.a('number')
  expect(str).to.be.a('String')
  expect({}).to.be.an('object')
  expect([]).to.be.an('array')
})

it('String', () => {
  const str = "String de teste";

  expect(str).to.be.equal("String de teste");
  expect(str).to.be.contains("de")
  expect(str).to.be.have.length(15)
  expect(str).to.match(/de/)
  expect(str).to.match(/^String/) // '^' é usado para saber se está no início
  expect(str).to.match(/teste$/) // '$' é usado para saber se está no fim
  expect(str).to.match(/.{15}/)
  expect(str).to.match(/\w+/) // para saber se existe apenas letras
  expect(str).to.match(/\D+/) // para saber se não existe números
})

it('Numbers', () => {
  const number = 4;
  const floatNumber = 5.2123;

  expect(number).to.be.equal(4)
  expect(number).to.be.above(3) // above = acima
  expect(number).to.be.below(7) // below = abaixo
  expect(floatNumber).to.be.equal(5.2123)
  expect(floatNumber).to.be.closeTo(5.21, 0.1) //proximo de
  expect(floatNumber).to.be.above(5)
})

