const { Sequelize, DataTypes } = require('sequelize');
let { NODE_ENV } = process.env;
let options = require('../config/database');
var _Checklist = require('./checklist');
var _Nota = require('./nota');
var _Tag = require('./tag');
var _Usuario = require('./usuario');
let database = {};

NODE_ENV = NODE_ENV || 'production';

options = options[NODE_ENV];

const sequelize = new Sequelize(options);

sequelize
  .authenticate()
  .then(() => console.log(`Conexão com o banco ${options.database} no ambiente ${NODE_ENV} realizada com sucesso`))
  .catch((error) => console.log(`Falha ao conectar ao banco ${options.database}: ${error}`));

const Checklist = _Checklist(sequelize, DataTypes);
const Nota = _Nota(sequelize, DataTypes);
const Tag = _Tag(sequelize, DataTypes);
const Usuario = _Usuario(sequelize, DataTypes);

Checklist.belongsTo(Nota, { as: 'nota', foreignKey: 'notaId' });
Nota.hasMany(Checklist, { as: 'checklists', foreignKey: 'notaId' });
Nota.hasMany(Tag, { as: 'tags', foreignKey: 'notaId' });
Nota.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioId' });
Tag.belongsTo(Nota, { as: 'nota', foreignKey: 'notaId' });

database = { Checklist, Nota, Tag, Usuario };

database.sequelize = sequelize;

module.exports = database;
