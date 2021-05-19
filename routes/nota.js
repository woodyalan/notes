const { Router } = require('express');
const router = Router();
const controller = require('../controller/default');
const controllerNota = require('../controller/nota');
const { Nota } = require('../models');
const jwt = require('jsonwebtoken');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const nota = await controllerNota.getById(id);

  res.send(nota);
});

router.get('/usuario/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const { tag } = req.query;

  const notas = await controllerNota.getByUsuarioId(usuarioId, tag);

  res.send(notas || []);
});

router.post('/', async (req, res) => {
  try {
    let { body, token } = req;

    const { id } = jwt.decode(token);

    body = { ...body, usuarioId: id };

    const nota = await controllerNota.save(body);

    res.send(nota);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    let { body, token } = req;
    const { id } = req.params;

    const decoded = jwt.decode(token);

    body = { ...body, usuarioId: decoded.id };

    const nota = await controllerNota.edit(body, id);

    res.send(nota);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await controller.remove(Nota, id);

    res.send({ id });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
