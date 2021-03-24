const { Router } = require('express');
const router = Router();
const controller = require('../controller/default');
const { Checklist } = require('../models');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const checklists = id ? await controller.getById(Checklist, id) : await controller.getAll(Checklist);

  res.send(checklists || []);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const checklist = await controller.save(Checklist, body);

    res.send(checklist);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const checklist = await controller.edit(Checklist, body, id);

    res.send(checklist);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await controller.remove(Checklist, id);

    res.send({ id });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
