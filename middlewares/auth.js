const jwt = require('jsonwebtoken');
const { secret } = require('../config/security');

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) res.status(401).send({ error: 'Token não informado' });

  jwt.verify(token, secret, (error) => {
    if (error) return res.status(500).send({ error });

    next();
  });
};
