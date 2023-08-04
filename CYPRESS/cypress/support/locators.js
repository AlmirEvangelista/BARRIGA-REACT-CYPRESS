const locators = {
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn'
  },

  MENU: {
    SETTINGS: '[data-test=menu-settings]',
    ACCOUNT: '[href="/contas"]',
    MOVIMENTATION: '[title="Cadastrar movimentação"]',
    RESET_BTN: '[href="/reset"]'
  },

  ACCOUNTS: {
    NAME: '[data-test=nome]',
    BTN_SAVE: '.btn',
    XP_BTN_ALTERAR: "//table//td[contains(., 'Conta de Teste')]/..//i[@class='far fa-edit']"
  },

  MOVIMENTATION: {
    POSITIVE_BUTTON: '[title="Receita"]',
    DESCRIPTION_MOVIMENTATION: '[data-test=descricao]',
    VALUE_MOVIMENTATION: '[data-test=valor]',
    INVOLVED: '[data-test=envolvido]',
    ACCOUNT: '[data-test=conta]',
    BTN_SAVE: '[alt="Salvar"]'
  },

  EXTRACT: {
    LINES: '.list-group > li',
    XP_SEARCH_ELEMENT: "//span[contains(., 'Aluguel')]/following-sibling::small[contains(., 500)]"
  },

  MESSAGE: '.toast-message'


}

export default locators;