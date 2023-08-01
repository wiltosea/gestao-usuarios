describe('User Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Validar que a mensagem "No users yet." é exibido quando não existir nenhum usuário no banco de dados', () => {
    cy.contains('p', 'No User yet').should('exist');
  });

  it('Validar a criação de um novo usuário no banco de dados (este cenário deve considerar o preenchimento do formulário de cadastro e depois clicar no botão "Save")', () => {
    cy.contains('Create').click();

    cy.get('input[name="name"]').type('João da Silva');
    cy.get('input[name="email"]').type('joao@gmail.com');
    cy.get('input[name="password"]').type('teste123');

    cy.contains('Save').click();

    cy.wait(8000)

    cy.url().should('eq', 'http://localhost:5173/#/users');

    cy.contains('João da Silva').should('be.visible');
  });

  it('Validar a criação de um novo usuário no banco de dados (este cenário deve considerar o preenchimento do formulário de cadastro e depois apertar "Enter" para enviar os dados))', () => {
    cy.contains('Create').click();

    cy.get('input[name="name"]').type('Antonio José');
    cy.get('input[name="email"]').type('antonio.jose@gmail.com');
    cy.get('input[name="password"]').type('teste123');

    cy.get('input[name="name"]').type('{enter}');

    cy.wait(8000)

    cy.url().should('eq', 'http://localhost:5173/#/users');

    cy.contains('Antonio José').should('be.visible');
  });

  it('Validar a edição de um usuário existente no banco de dados', () => {
    cy.contains('João da Silva').click();

    cy.get('input[name="name"]').clear().type('João Pedro');
    cy.get('input[name="password"]').type('wtf123');

    cy.contains('Save').click();

    cy.url().should('eq', 'http://localhost:5173/#/users');
    cy.wait(8000)

    cy.contains('João Pedro').should('be.visible');
  });

  it('Cancelar a edição de um usuário depois de preencher o formulário e clicar no botão "Save"', () => {
    cy.contains('João Pedro').click();

    cy.get('input[name="name"]').clear().type('João Paulo Antonio');
    cy.get('input[name="password"]').type('wtf123');

    cy.contains('Save').click();
    cy.contains('Element updated').should('exist');
    // cy.contains('undo').click();
    cy.get('.RaNotification-undo').should('be.visible').click();

    cy.url().should('eq', 'http://localhost:5173/#/users');

    cy.contains('João Pedro').should('be.visible');
  });

  it('Validar se um usuário está sendo listado', () => {
    cy.contains('João Pedro').should('be.visible');
  });

  it('Cancelar a remoção de um usuário depois de clicar no botão "Delete"', () => {
    cy.contains('João Pedro').click();
    cy.get('.ra-delete-button').click();
    cy.get('.RaNotification-undo').should('be.visible').click();
  });

  it('Validar a remoção de um usuário no banco de dados', () => {
    cy.contains('João Pedro').click();
    cy.get('.ra-delete-button').click();
  });
});