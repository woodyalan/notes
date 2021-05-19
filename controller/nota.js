const { Nota, Checklist, Tag, sequelize } = require('../models');
const controller = {};

controller.getById = async (id) => {
  return await Nota.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Checklist,
        as: 'checklists',
      },
      {
        model: Tag,
        as: 'tags',
      },
    ],
  });
};

controller.getByUsuarioId = async (usuarioId, tagName = null) => {
  try {
    let where = null;
    let required = false;

    if (tagName) {
      where = { nome: tagName };
      required = true;
    }

    return await Nota.findAll({
      where: {
        usuarioId,
      },
      include: [
        {
          model: Checklist,
          as: 'checklists',
        },
        {
          model: Tag,
          as: 'tags',
          where,
          required,
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

controller.save = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }) => {
  const transaction = await sequelize.transaction();

  try {
    let { dataValues } = await Nota.create(
      {
        usuarioId,
        titulo,
        descricao,
      },
      {
        transaction,
      }
    );

    let notaSalva = dataValues;

    let checklistsSalvos = [];

    if (checklists.length > 0) {
      for (let checklist of checklists) {
        checklist = { ...checklist, notaId: notaSalva.id };

        const checklistSalvo = await Checklist.create(checklist, {
          transaction,
        });

        checklistsSalvos.push(checklistSalvo);
      }
    }

    let tagsSalvas = [];

    if (tags.length > 0) {
      for (let tag of tags) {
        tag = { ...tag, notaId: notaSalva.id };

        const tagSalva = await Tag.create(tag, {
          transaction,
        });

        tagsSalvas = [...tagsSalvas, tagSalva];
      }
    }

    notaSalva = { ...notaSalva, checklists: checklistsSalvos, tags: tagsSalvas };

    await transaction.commit();

    return notaSalva;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
  }
};

controller.edit = async ({ usuarioId, titulo = null, descricao = null, checklists = [], tags = [] }, id) => {
  const transaction = await sequelize.transaction();

  try {
    await Nota.update(
      {
        usuarioId,
        titulo,
        descricao,
      },
      {
        where: { id },
        transaction,
      }
    );

    let { dataValues } = await Nota.findOne({ where: { id }, transaction });
    notaSalva = dataValues;

    let checklistsSalvos = [];

    if (checklists.length > 0) {
      for (let checklist of checklists) {
        checklist = { ...checklist, notaId: id };
        let checklistSalvo;

        if (checklist.id) {
          checklistSalvo = Object.assign({}, checklist);

          const checklistId = checklist.id;
          delete checklist.id;

          await Checklist.update(checklist, {
            where: {
              id: checklistId,
            },
            transaction,
          });
        } else {
          checklistSalvo = await Checklist.create(checklist, {
            transaction,
          });
        }

        checklistsSalvos.push(checklistSalvo);
      }
    }

    let tagsSalvas = [];

    if (tags.length > 0) {
      for (let tag of tags) {
        tag = { ...tag, notaId: id };
        let tagSalva;

        if (tag.id) {
          tagSalva = Object.assign({}, tag);

          const tagId = tag.id;
          delete tag.id;

          tagSalva = await Tag.update(tag, {
            where: {
              id: tagId,
            },
            transaction,
          });
        } else {
          tagSalva = await Tag.create(tag, {
            transaction,
          });
        }

        tagsSalvas = [...tagsSalvas, tagSalva];
      }
    }

    notaSalva = { ...notaSalva, checklists: checklistsSalvos, tags: tagsSalvas };

    console.log(notaSalva);

    await transaction.commit();

    return notaSalva;
  } catch (error) {
    console.log(error);
    await transaction.rollback();
  }
};

module.exports = controller;
