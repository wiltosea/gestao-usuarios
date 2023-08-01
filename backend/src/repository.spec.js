const Container = require('./container');

describe('UserRepository', () => {
  let repository;
  let client;

  beforeAll(async () => {
    const container = new Container();
    client = container.getClient();
    repository = await container.getRepository();
  });

  afterAll(async () => {
    await client.close();
  });

  beforeEach(async () => {
    await repository.deleteAll();
  });

  test('Repositório deve criar um novo usuário (C)', async () => {
    const result = await repository.create({
      name: 'Rock in Rio',
      date: '2024-02-07',
    });

    expect(result).toStrictEqual(
      expect.objectContaining({
        name: 'Rock in Rio',
        date: '2024-02-07',
      }),
    );

    const users = await repository.findAll();

    expect(users.length).toBe(1);
  });

  test('Repositório deve listar todos os usuários (R)', async () => {
    await repository.create({
      name: 'Rock in Rio',
      date: '2024-02-07',
    });

    const result = await repository.findAll();

    expect(result.length).toBe(1);

    expect(result[0]).toStrictEqual(
      expect.objectContaining({
        name: 'Rock in Rio',
        date: '2024-02-07',
      }),
    );
  });

  test('Repositório deve atualizar um usuário (U)', async () => {
    // 1. banco de dados deve estar vazio - ok
    // 2. inserir um usuário - ok
    const user = await repository.create({
      name: 'João da Silva',
      email: 'joao@gmail.com',
      password: 'teste123',
    });

    // 3. alterar o usuário - ok
    user.password = 'teste456';
    await repository.update(user);

    // 4. certificar que o usuário foi atualizado no banco de dados. - ok
    const result = await repository.findById(user._id);
    expect(result).toStrictEqual(
      expect.objectContaining({
        name: 'João da Silva',
        email: 'joao@gmail.com',
        password: 'teste456',
      }),
    );
  });

  test('Repositório deve remover um usuário (D)', async () => {
    // 1. banco de dados deve estar vazio - OK
    // 2. deve existir um usuário previamente cadastrado - OK
    const user = await repository.create({
      name: 'João da Silva',
      email: 'joao@gmail.com',
      password: 'teste123',
    });

    // 3. remover o usuário
    await repository.delete(user);

    // 4. certificar que o usuário foi removido do banco de dados.
    const users = await repository.findAll();
    expect(users.length).toBe(0);
  });

  test('Repositorio não deve permitir remoção de usuário sem id', async () => {
    const user = {
      name: 'João da Silva',
      email: 'joao@gmail.com',
      password: 'teste456',
    };

    const expression = () => repository.delete(user);
    await expect(expression).rejects.toThrow('Evento invalido');
  });
});
