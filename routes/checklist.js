const { Router } = require('express');
const router = Router();
const checklistController = require('../controller/checklist');

router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  const checklists = await checklistController.getByUsuarioId(usuarioId);

  res.send(checklists || []);
});

router.delete('/:notaId/:id', async (req, res) => {
  try {
    const { notaId, id } = req.params;

    await checklistController.remove(notaId, id);

    res.send({ id });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
