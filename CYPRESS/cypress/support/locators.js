const locators = {
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
  },

  MENU: {
    HOME: '[data-test=menu-home]',
    SETTINGS: '[data-test=menu-settings]',
    ACCOUNT: '[href="/contas"]',
    MOVIMENTATION: '[title="Cadastrar movimentação"]',
    EXTRACT: '[data-test=menu-extrato]',
    RESET_BTN: '[href="/reset"]'
  },

  SALDO: {
    FN_XP_BALANCE_VALUE: nome => `//td[contains(., '${nome}')]/../td[2]`
  },

  ACCOUNTS: {
    NAME: '[data-test=nome]',
    BTN_SAVE: '.btn',
    XP_BTN_ALTERAR: `//table//td[contains(., 'Conta para alterar')]/..//i[@class='far fa-edit']`,
    XP_BTN_ALTERAR2: `//table//td[contains(., 'Nubank')]/..//i[@class='far fa-edit']`
  },

  MOVIMENTATION: {
    POSITIVE_BUTTON: '[title="Receita"]',
    DESCRIPTION_MOVIMENTATION: '[data-test=descricao]',
    VALUE_MOVIMENTATION: '[data-test=valor]',
    INVOLVED: '[data-test=envolvido]',
    ACCOUNT: '[data-test=conta]',
    STATUS: '[data-test=status]',
    BTN_SAVE: '[alt="Salvar"]'
  },

  EXTRACT: {
    LINES: '.list-group > li',
    FN_XP_SEARCH_ELEMENT: (descricao, valor) => `//span[contains(., ${descricao})]/following-sibling::small[contains(., ${valor})]`,
    FN_XP_BTN_DELETE_MOV: desc => `//span[contains(., '${desc}')]/../../..//i[@class='far fa-trash-alt']`,

    FN_XP_BTN_CHANGE_MOV: desc => `//span[contains(., '${desc}')]/../../..//i[@class='fas fa-edit']`,

    XP_LINHA1: `//span[contains(., 'Receita paga')]/../../../..`,
    XP_LINHA2: `//span[contains(., 'Receita pendente')]/../../../..`,
    XP_LINHA3: `//span[contains(., 'Despesa paga')]/../../../..`,
    XP_LINHA4:  `//span[contains(., 'Despesa pendente')]/../../../..`
  },

  MESSAGE: '.toast-message'


}

export default locators;