const { Router } = require('express');
const router = Router();
const { login } = require('../controller/usuario');
const { save } = require('../controller/default');
const { Usuario } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const token = await login(email, senha);

    if (token) {
      res.send({ token });
    } else {
      res.status(401).send({ error: 'Login ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post('/registro', async (req, res) => {
  try {
    const { body } = req;

    const usuario = await save(Usuario, body);

    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

module.exports = router;
