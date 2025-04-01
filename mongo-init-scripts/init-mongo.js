// Switch to the database specified in docker-compose (or default 'test' if not specified)
// In our docker-compose, we specified MONGO_INITDB_DATABASE=school_db_mongo
// db = db.getSiblingDB('school_db_mongo'); // No longer needed if MONGO_INITDB_DATABASE is set

print("Starting MongoDB initialization script...");

// Create students collection and insert sample data
db.students.insertMany([
  { firstName: 'John', lastName: 'Smith', email: 'john.smith@school.edu', birthDate: new Date('2006-05-10'), gradeLevel: 10, createdAt: new Date() },
  { firstName: 'Emma', lastName: 'Johnson', email: 'emma.j@school.edu', birthDate: new Date('2007-08-15'), gradeLevel: 9, createdAt: new Date() },
  { firstName: 'Michael', lastName: 'Williams', email: 'michael.w@school.edu', birthDate: new Date('2005-11-22'), gradeLevel: 11, createdAt: new Date() },
  { firstName: 'Sophia', lastName: 'Brown', email: 'sophia.b@school.edu', birthDate: new Date('2008-02-28'), gradeLevel: 8, createdAt: new Date() },
  { firstName: 'William', lastName: 'Jones', email: 'william.j@school.edu', birthDate: new Date('2006-07-14'), gradeLevel: 10, createdAt: new Date() }
]);
print("Inserted sample students.");

// Create courses collection and insert sample data
db.courses.insertMany([
  { courseName: 'Mathematics 101', description: 'Introduction to algebra and geometry', creditHours: 3, teacherName: 'Dr. Roberts' },
  { courseName: 'English Literature', description: 'Classic literature and composition', creditHours: 3, teacherName: 'Ms. Thompson' },
  { courseName: 'Biology', description: 'Study of living organisms', creditHours: 4, teacherName: 'Mr. Davis' },
  { courseName: 'History', description: 'World history from 1900 to present', creditHours: 3, teacherName: 'Mrs. Garcia' },
  { courseName: 'Computer Science', description: 'Introduction to programming concepts', creditHours: 4, teacherName: 'Dr. Wilson' }
]);
print("Inserted sample courses.");

// Get ObjectIds for students and courses to simulate enrollments (MongoDB uses ObjectId)
let johnId = db.students.findOne({ email: 'john.smith@school.edu' })._id;
let emmaId = db.students.findOne({ email: 'emma.j@school.edu' })._id;
let michaelId = db.students.findOne({ email: 'michael.w@school.edu' })._id;
let sophiaId = db.students.findOne({ email: 'sophia.b@school.edu' })._id;
let williamId = db.students.findOne({ email: 'william.j@school.edu' })._id;

let mathId = db.courses.findOne({ courseName: 'Mathematics 101' })._id;
let englishId = db.courses.findOne({ courseName: 'English Literature' })._id;
let biologyId = db.courses.findOne({ courseName: 'Biology' })._id;
let historyId = db.courses.findOne({ courseName: 'History' })._id;
let csId = db.courses.findOne({ courseName: 'Computer Science' })._id;

// Create enrollments collection and insert sample data
db.enrollments.insertMany([
  { studentId: johnId, courseId: mathId, enrollmentDate: new Date('2023-09-01'), grade: 'A' },
  { studentId: johnId, courseId: biologyId, enrollmentDate: new Date('2023-09-01'), grade: 'B+' },
  { studentId: emmaId, courseId: englishId, enrollmentDate: new Date('2023-09-02'), grade: 'A-' },
  { studentId: emmaId, courseId: historyId, enrollmentDate: new Date('2023-09-02'), grade: 'B' },
  { studentId: michaelId, courseId: mathId, enrollmentDate: new Date('2023-09-01'), grade: 'C+' },
  { studentId: michaelId, courseId: csId, enrollmentDate: new Date('2023-09-03'), grade: 'A' },
  { studentId: sophiaId, courseId: biologyId, enrollmentDate: new Date('2023-09-02'), grade: 'B-' },
  { studentId: sophiaId, courseId: historyId, enrollmentDate: new Date('2023-09-02'), grade: 'A' },
  { studentId: williamId, courseId: englishId, enrollmentDate: new Date('2023-09-01'), grade: 'B' },
  { studentId: williamId, courseId: csId, enrollmentDate: new Date('2023-09-01'), grade: 'A-' }
]);
print("Inserted sample enrollments.");

// Create indexes for faster querying (optional but recommended)
db.students.createIndex({ email: 1 }, { unique: true });
db.courses.createIndex({ courseName: 1 });
db.enrollments.createIndex({ studentId: 1, courseId: 1 }, { unique: true });
db.enrollments.createIndex({ studentId: 1 });
db.enrollments.createIndex({ courseId: 1 });
print("Created indexes.");

print("MongoDB initialization script finished successfully.");
