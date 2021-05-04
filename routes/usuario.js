const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const controller = require('../controller/default');
const { Usuario } = require('../models');

router.get('/', async (req, res) => {
  const { token } = req;

  const { id } = jwt.decode(token);

  const usuario = await controller.getById(Usuario, id);

  res.send(usuario);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const usuario = await controller.save(Usuario, body);

    res.send(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.put('/', async (req, res) => {
  try {
    const { body, token } = req;

    const { id } = jwt.decode(token);

    const usuario = await controller.edit(Usuario, body, id);

    res.send(usuario);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await controller.remove(Usuario, id);

    res.send({ id });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
