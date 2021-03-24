const bcrypt = require('bcrypt');
const { saltRounds } = require('../config/security');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'usuario',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: 'usuario',
      timestamps: false,
      hooks: {
        beforeCreate: (usuario) => {
          usuario.senha = bcrypt.hashSync(usuario.senha, saltRounds);
        },
      },
      defaultScope: {
        attributes: {
          exclude: ['senha'],
        },
      },
      scopes: {
        login: {
          attributes: ['id', 'senha'],
        },
      },
    }
  );
};
