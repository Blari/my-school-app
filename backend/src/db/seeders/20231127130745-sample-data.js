const db = require('../models');
const Users = db.users;

const Assignments = db.assignments;

const Classes = db.classes;

const Grades = db.grades;

const Parents = db.parents;

const Students = db.students;

const Teachers = db.teachers;

const AssignmentsData = [
  {
    title: 'Math Homework 1',

    description: 'Complete exercises 1-10 on page 23',

    due_date: new Date('2023-10-15T00:00:00Z'),
  },

  {
    title: 'Science Project',

    description: 'Build a model of the solar system',

    due_date: new Date('2023-10-20T00:00:00Z'),
  },

  {
    title: 'History Essay',

    description: 'Write an essay on the causes of World War I',

    due_date: new Date('2023-10-25T00:00:00Z'),
  },

  {
    title: 'English Poem',

    description: 'Write a poem about nature',

    due_date: new Date('2023-10-30T00:00:00Z'),
  },
];

const ClassesData = [
  {
    name: 'Math 101',

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    name: 'Science 101',

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    name: 'History 101',

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },

  {
    name: 'English 101',

    // type code here for "relation_one" field

    // type code here for "relation_many" field
  },
];

const GradesData = [
  {
    grade: 95.5,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    grade: 88,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    grade: 92,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    grade: 85,

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ParentsData = [
  {
    first_name: 'John',

    last_name: 'Doe',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    animal: 'Ernest Rutherford',
  },

  {
    first_name: 'Jane',

    last_name: 'Smith',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    animal: 'Erwin Schrodinger',
  },

  {
    first_name: 'Michael',

    last_name: 'Johnson',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    animal: 'John von Neumann',
  },

  {
    first_name: 'Emily',

    last_name: 'Clark',

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    animal: 'Paul Ehrlich',
  },
];

const StudentsData = [
  {
    first_name: 'Sarah',

    last_name: 'Lee',

    date_of_birth: new Date('2005-04-12T00:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    first_name: 'David',

    last_name: 'Kim',

    date_of_birth: new Date('2006-08-23T00:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    first_name: 'Emma',

    last_name: 'Brown',

    date_of_birth: new Date('2007-01-15T00:00:00Z'),

    // type code here for "relation_one" field
  },

  {
    first_name: 'James',

    last_name: 'Wilson',

    date_of_birth: new Date('2005-11-30T00:00:00Z'),

    // type code here for "relation_one" field
  },
];

const TeachersData = [
  {
    first_name: 'Michael',

    last_name: 'Jones',

    subject: 'Mathematics',

    // type code here for "relation_one" field
  },

  {
    first_name: 'Emily',

    last_name: 'Clark',

    subject: 'Science',

    // type code here for "relation_one" field
  },

  {
    first_name: 'Robert',

    last_name: 'Taylor',

    subject: 'History',

    // type code here for "relation_one" field
  },

  {
    first_name: 'Laura',

    last_name: 'Davis',

    subject: 'English',

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateClassWithTeacher() {
  const relatedTeacher0 = await Teachers.findOne({
    offset: Math.floor(Math.random() * (await Teachers.count())),
  });
  const Class0 = await Classes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Class0?.setTeacher) {
    await Class0.setTeacher(relatedTeacher0);
  }

  const relatedTeacher1 = await Teachers.findOne({
    offset: Math.floor(Math.random() * (await Teachers.count())),
  });
  const Class1 = await Classes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Class1?.setTeacher) {
    await Class1.setTeacher(relatedTeacher1);
  }

  const relatedTeacher2 = await Teachers.findOne({
    offset: Math.floor(Math.random() * (await Teachers.count())),
  });
  const Class2 = await Classes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Class2?.setTeacher) {
    await Class2.setTeacher(relatedTeacher2);
  }

  const relatedTeacher3 = await Teachers.findOne({
    offset: Math.floor(Math.random() * (await Teachers.count())),
  });
  const Class3 = await Classes.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Class3?.setTeacher) {
    await Class3.setTeacher(relatedTeacher3);
  }
}

// Similar logic for "relation_many"

async function associateGradeWithStudent() {
  const relatedStudent0 = await Students.findOne({
    offset: Math.floor(Math.random() * (await Students.count())),
  });
  const Grade0 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Grade0?.setStudent) {
    await Grade0.setStudent(relatedStudent0);
  }

  const relatedStudent1 = await Students.findOne({
    offset: Math.floor(Math.random() * (await Students.count())),
  });
  const Grade1 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Grade1?.setStudent) {
    await Grade1.setStudent(relatedStudent1);
  }

  const relatedStudent2 = await Students.findOne({
    offset: Math.floor(Math.random() * (await Students.count())),
  });
  const Grade2 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Grade2?.setStudent) {
    await Grade2.setStudent(relatedStudent2);
  }

  const relatedStudent3 = await Students.findOne({
    offset: Math.floor(Math.random() * (await Students.count())),
  });
  const Grade3 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Grade3?.setStudent) {
    await Grade3.setStudent(relatedStudent3);
  }
}

async function associateGradeWithAssignment() {
  const relatedAssignment0 = await Assignments.findOne({
    offset: Math.floor(Math.random() * (await Assignments.count())),
  });
  const Grade0 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Grade0?.setAssignment) {
    await Grade0.setAssignment(relatedAssignment0);
  }

  const relatedAssignment1 = await Assignments.findOne({
    offset: Math.floor(Math.random() * (await Assignments.count())),
  });
  const Grade1 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Grade1?.setAssignment) {
    await Grade1.setAssignment(relatedAssignment1);
  }

  const relatedAssignment2 = await Assignments.findOne({
    offset: Math.floor(Math.random() * (await Assignments.count())),
  });
  const Grade2 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Grade2?.setAssignment) {
    await Grade2.setAssignment(relatedAssignment2);
  }

  const relatedAssignment3 = await Assignments.findOne({
    offset: Math.floor(Math.random() * (await Assignments.count())),
  });
  const Grade3 = await Grades.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Grade3?.setAssignment) {
    await Grade3.setAssignment(relatedAssignment3);
  }
}

async function associateParentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent0 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Parent0?.setUser) {
    await Parent0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent1 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Parent1?.setUser) {
    await Parent1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent2 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Parent2?.setUser) {
    await Parent2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Parent3 = await Parents.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Parent3?.setUser) {
    await Parent3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

async function associateStudentWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student0 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Student0?.setUser) {
    await Student0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student1 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Student1?.setUser) {
    await Student1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student2 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Student2?.setUser) {
    await Student2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Student3 = await Students.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Student3?.setUser) {
    await Student3.setUser(relatedUser3);
  }
}

async function associateTeacherWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Teacher0 = await Teachers.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Teacher0?.setUser) {
    await Teacher0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Teacher1 = await Teachers.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Teacher1?.setUser) {
    await Teacher1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Teacher2 = await Teachers.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Teacher2?.setUser) {
    await Teacher2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Teacher3 = await Teachers.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Teacher3?.setUser) {
    await Teacher3.setUser(relatedUser3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Assignments.bulkCreate(AssignmentsData);

    await Classes.bulkCreate(ClassesData);

    await Grades.bulkCreate(GradesData);

    await Parents.bulkCreate(ParentsData);

    await Students.bulkCreate(StudentsData);

    await Teachers.bulkCreate(TeachersData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateClassWithTeacher(),

      // Similar logic for "relation_many"

      await associateGradeWithStudent(),

      await associateGradeWithAssignment(),

      await associateParentWithUser(),

      // Similar logic for "relation_many"

      await associateStudentWithUser(),

      await associateTeacherWithUser(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('assignments', null, {});

    await queryInterface.bulkDelete('classes', null, {});

    await queryInterface.bulkDelete('grades', null, {});

    await queryInterface.bulkDelete('parents', null, {});

    await queryInterface.bulkDelete('students', null, {});

    await queryInterface.bulkDelete('teachers', null, {});
  },
};
