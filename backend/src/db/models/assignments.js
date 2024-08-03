const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const assignments = sequelize.define(
    'assignments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      due_date: {
        type: DataTypes.DATE,
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

  assignments.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.assignments.hasMany(db.grades, {
      as: 'grades_assignment',
      foreignKey: {
        name: 'assignmentId',
      },
      constraints: false,
    });

    //end loop

    db.assignments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.assignments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return assignments;
};
