const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      { id: getId('Principal'), name: 'Principal', createdAt, updatedAt },

      {
        id: getId('VicePrincipal'),
        name: 'VicePrincipal',
        createdAt,
        updatedAt,
      },

      {
        id: getId('SeniorTeacher'),
        name: 'SeniorTeacher',
        createdAt,
        updatedAt,
      },

      {
        id: getId('JuniorTeacher'),
        name: 'JuniorTeacher',
        createdAt,
        updatedAt,
      },

      { id: getId('Student'), name: 'Student', createdAt, updatedAt },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'assignments',
      'classes',
      'grades',
      'parents',
      'students',
      'teachers',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('READ_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('UPDATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('DELETE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('READ_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('UPDATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('READ_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('UPDATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('READ_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('UPDATE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('READ_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('UPDATE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('DELETE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('READ_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('UPDATE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('READ_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('READ_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('READ_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('UPDATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('DELETE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('READ_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('UPDATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('READ_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('UPDATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('READ_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('UPDATE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('UPDATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('UPDATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('UPDATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('UPDATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('READ_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('UPDATE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('DELETE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('READ_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('UPDATE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('READ_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('READ_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('READ_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Principal'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('VicePrincipal'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SeniorTeacher'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('JuniorTeacher'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Student'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ASSIGNMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ASSIGNMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ASSIGNMENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ASSIGNMENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CLASSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CLASSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CLASSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CLASSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_GRADES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_GRADES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_GRADES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_GRADES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PARENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PARENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_STUDENTS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_STUDENTS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_TEACHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_TEACHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_TEACHERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_TEACHERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Principal',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'VicePrincipal',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
