const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const grades = sequelize.define(
    'grades',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      grade: {
        type: DataTypes.DECIMAL,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  grades.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.grades.belongsTo(db.students, {
      as: 'student',
      foreignKey: {
        name: 'studentId',
      },
      constraints: false,
    });

    db.grades.belongsTo(db.assignments, {
      as: 'assignment',
      foreignKey: {
        name: 'assignmentId',
      },
      constraints: false,
    });

    db.grades.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.grades.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return grades;
};
