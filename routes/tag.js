const { Router } = require('express');
const router = Router();
const tagController = require('../controller/tag');

router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  const tags = await tagController.getByUsuarioId(usuarioId);

  res.send(tags || []);
});

router.delete('/:notaId/:id', async (req, res) => {
  try {
    const { notaId, id } = req.params;

    await tagController.remove(notaId, id);

    res.send({ id });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
