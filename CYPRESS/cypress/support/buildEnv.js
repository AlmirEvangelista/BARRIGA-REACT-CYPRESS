const buildEnv = () => {
  cy.server()
    cy.route({
      method: 'POST',
      url: '/signin',
      response: {
        id: 10,
        nome: 'Usuário Falso',
        token: 'Uma string muito grande que não deveria ser aceita, mas vai'
      }
    }).as('signin')

    cy.route({
      method: 'GET',
      url: '/saldo',
      response: [{
        conta_id: 1,
        conta: "Nubank",
        saldo: "200.00"
      }],
      response: [{
        conta_id: 2,
        conta: "Inter",
        saldo: "100.00"
      }]
    }).as('getSaldo')

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
        
      ]
    }).as('saveConta')

    cy.route({
      method: 'GET', 
      url: '/extrato/**',
      response: [
        {
            conta: "Conta para movimentacoes",
            id: 1738166,
            descricao: "Movimentacao para exclusao",
            envolvido: "AAA",
            observacao: null,
            tipo: "DESP",
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
            descricao: "Movimentacao de conta",
            envolvido: "BBB",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "-1500.00",
            status: true,
            conta_id: 1855202,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
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
        },
        {
            conta: "Conta para saldo",
            id: 1738169,
            descricao: "Movimentacao 2, calculo saldo",
            envolvido: "DDD",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "-1000.00",
            status: true,
            conta_id: 1855203,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para saldo",
            id: 1738170,
            descricao: "Movimentacao 3, calculo saldo",
            envolvido: "EEE",
            observacao: null,
            tipo: "REC",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "1534.00",
            status: true,
            conta_id: 1855203,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para extrato",
            id: 1738171,
            descricao: "Movimentacao para extrato",
            envolvido: "FFF",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "-220.00",
            status: true,
            conta_id: 1855204,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
        },
        {
            conta: "Conta para alterar",
            id: 1738172,
            descricao: "Recebimento Aluguel",
            envolvido: "Seu Barriga",
            observacao: null,
            tipo: "REC",
            data_transacao: "2023-08-14T03:00:00.000Z",
            data_pagamento: "2023-08-14T03:00:00.000Z",
            valor: "500.00",
            status: true,
            conta_id: 1855199,
            usuario_id: 39925,
            transferencia_id: null,
            parcelamento_id: null
        }
    ]
    })


    cy.route({
      method: 'DELETE',
      url: 'transacoes/**'
    })

}

export default buildEnv