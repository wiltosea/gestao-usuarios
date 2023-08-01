const express = require('express');
const Container = require('./container');
const cors = require('cors');

const app = express();
app.use(express.json());
app.set('container', new Container());

const corsOptions = {
  exposedHeaders: ['X-Total-Count'],
  allowedHeaders: ['Content-Type', 'X-Total-Count'],
  credentials: true,
  origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));
app.get('/users', async (request, response) => {
  const repository = await app.get('container').getRepository();
  try {
    const users = (await repository.findAll()).map((user) => {
      user.id = user._id;
      delete user._id;
      return user;
    });

    response.set('X-Total-Count', users.length.toString()); // Corrigido para users.length
    response.json(users);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});

app.get('/users/:id', async (request, response) => {
  const repository = await app.get('container').getRepository();
  try {
    const userId = request.params.id; // Obtém o ID do usuário da URL
    const user = await repository.findById(userId); // Busca o usuário pelo ID no repositório

    if (user === null) {
      // Se o usuário não for encontrado, retorna 404 (Not Found)
      response.status(404).json({
        status: 404,
        error: 'Usuário não encontrado',
      });
    } else {
      // Converte o campo _id para id antes de enviar a resposta
      user.id = user._id;
      delete user._id;

      // Se o usuário for encontrado, retorna o usuário encontrado
      response.json(user);
    }
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});

app.post('/users', async (request, response) => {
  const repository = await app.get('container').getRepository();

  try {
    const user = await repository.create(request.body);
    response.status(201).json(user);
  } catch (e) {
    response.status(500).json({ error: e.message });
  }
});

app.put('/users/:id', async (request, response) => {
  const repository = await app.get('container').getRepository();

  try {
    const userId = request.params.id; // Obtém o ID do usuário da URL
    const user = await repository.findById(userId);

    if (user === null) {
      response.status(404).json({
        status: 404,
        error: 'Usuário não encontrado',
      });
    } else {
      const userDataToUpdate = request.body;
      userDataToUpdate.id = userId;

      // Atualiza os campos do usuário com os dados do corpo da requisição
      Object.assign(user, userDataToUpdate);

      // Salva as alterações no banco de dados
      await repository.update(user);

      response.status(200).json(user);
    }
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: e.message });
  }
});

app.delete('/users/:id', async (request, response) => {
  const repository = await app.get('container').getRepository();
  const user = await repository.findById(request.params.id);

  if (null !== user) {
    await repository.delete(user);
    response.sendStatus(204);
  } else {
    response.status(404).json({
      status: 404,
      error: 'Usuário não encontrado',
    });
  }
});

module.exports = app;
