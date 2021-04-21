const { Checklist, Nota } = require('../models');
const controller = {};

controller.remove = async (notaId, id) => {
  try {
    return await Checklist.destroy({
      where: {
        id,
        notaId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

controller.getByUsuarioId = async (usuarioId) => {
  try {
    return await Checklist.findAll({
      include: [
        {
          model: Nota,
          as: 'nota',
          required: true,
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

module.exports = controller;
