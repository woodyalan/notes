const { Tag, Nota } = require('../models');
const controller = {};

controller.getByUsuarioId = async (usuarioId) => {
  try {
    return await Tag.findAll({
      include: [
        {
          model: Nota,
          required: true,
          as: 'nota',
          where: {
            usuarioId,
          },
        },
      ],
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

controller.remove = async (notaId, id) => {
  try {
    return await Tag.destroy({
      where: {
        id,
        notaId,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = controller;
