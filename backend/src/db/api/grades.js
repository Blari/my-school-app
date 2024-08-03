const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class GradesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const grades = await db.grades.create(
      {
        id: data.id || undefined,

        grade: data.grade || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await grades.setStudent(data.student || null, {
      transaction,
    });

    await grades.setAssignment(data.assignment || null, {
      transaction,
    });

    return grades;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const gradesData = data.map((item, index) => ({
      id: item.id || undefined,

      grade: item.grade || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const grades = await db.grades.bulkCreate(gradesData, { transaction });

    // For each item created, replace relation files

    return grades;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const grades = await db.grades.findByPk(id, {}, { transaction });

    await grades.update(
      {
        grade: data.grade || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await grades.setStudent(data.student || null, {
      transaction,
    });

    await grades.setAssignment(data.assignment || null, {
      transaction,
    });

    return grades;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const grades = await db.grades.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of grades) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of grades) {
        await record.destroy({ transaction });
      }
    });

    return grades;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const grades = await db.grades.findByPk(id, options);

    await grades.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await grades.destroy({
      transaction,
    });

    return grades;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const grades = await db.grades.findOne({ where }, { transaction });

    if (!grades) {
      return grades;
    }

    const output = grades.get({ plain: true });

    output.student = await grades.getStudent({
      transaction,
    });

    output.assignment = await grades.getAssignment({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.students,
        as: 'student',
      },

      {
        model: db.assignments,
        as: 'assignment',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.gradeRange) {
        const [start, end] = filter.gradeRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            grade: {
              ...where.grade,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            grade: {
              ...where.grade,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.student) {
        var listItems = filter.student.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          studentId: { [Op.or]: listItems },
        };
      }

      if (filter.assignment) {
        var listItems = filter.assignment.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assignmentId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.grades.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.grades.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('grades', 'grade', query),
        ],
      };
    }

    const records = await db.grades.findAll({
      attributes: ['id', 'grade'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['grade', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.grade,
    }));
  }
};
