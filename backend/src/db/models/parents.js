const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const parents = sequelize.define(
    'parents',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      first_name: {
        type: DataTypes.TEXT,
      },

      last_name: {
        type: DataTypes.TEXT,
      },

      animal: {
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

  parents.associate = (db) => {
    db.parents.belongsToMany(db.students, {
      as: 'children',
      foreignKey: {
        name: 'parents_childrenId',
      },
      constraints: false,
      through: 'parentsChildrenStudents',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.parents.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.parents.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.parents.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return parents;
};
