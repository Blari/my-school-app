const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const classes = sequelize.define(
    'classes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
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

  classes.associate = (db) => {
    db.classes.belongsToMany(db.students, {
      as: 'students',
      foreignKey: {
        name: 'classes_studentsId',
      },
      constraints: false,
      through: 'classesStudentsStudents',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.classes.belongsTo(db.teachers, {
      as: 'teacher',
      foreignKey: {
        name: 'teacherId',
      },
      constraints: false,
    });

    db.classes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.classes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return classes;
};
