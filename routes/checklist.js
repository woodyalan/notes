const { Router } = require('express');
const router = Router();
const controller = require('../controller/default');
const { Nota, Checklist } = require('../models');

router.get('/:id?', (req, res) => {
  res.send([]);
});

router.post('/', async (req, res) => {
  const nota = await controller.save(Nota, {
    usuarioId: 3
  });

  await controller.save(Checklist, {
    notaId: nota.id,
    descricao: "Test",
    concluida: true
  })
  res.send({});
});

router.put('/:id', (req, res) => {
  res.send({});
});

router.delete('/:id', (req, res) => {
  res.send({});
});

module.exports = router;
