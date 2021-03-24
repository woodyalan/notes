const { Router } = require('express');
const router = Router();
const controller = require('../controller/default');
const { Tag } = require('../models');

router.get('/:id?', async (req, res) => {
  const { id } = req.params;

  const tags = id ? await controller.getById(Tag, id) : await controller.getAll(Tag);

  res.send(tags || []);
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;

    const tag = await controller.save(Tag, body);

    res.send(tag);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const tag = await controller.edit(Tag, body, id);

    res.send(tag);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await controller.remove(Tag, id);

    res.send({ id });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
