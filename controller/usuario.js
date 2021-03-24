const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { secret } = require('../config/security');
const controller = {};

controller.login = async (email, senha) => {
  try {
    const usuario = await Usuario.scope('login').findOne({ where: { email } });
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) return false;

    return jwt.sign({ id: usuario.id }, secret, {
      expiresIn: '24h',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = controller;
