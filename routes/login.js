const { Router } = require('express');
const router = Router();
const { login } = require('../controller/usuario');

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

module.exports = router;
