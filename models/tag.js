module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'tag',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      notaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'nota',
          key: 'id',
        },
      },
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: 'tag',
      timestamps: false,
    }
  );
};
