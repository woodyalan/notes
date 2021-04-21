const jwt = require('jsonwebtoken');
const { secret } = require('../config/security');

module.exports = (req, res, next) => {
  if (!req.headers['authorization']) res.status(401).send({ error: 'Token não informado' });

  const [type, token] = req.headers['authorization'].split(' ');

  jwt.verify(token, secret, (error) => {
    if (error) return res.status(500).send({ error });

    next();
  });
};
