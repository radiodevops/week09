# PostgreSQL CRUD Examples (school_db)

This document shows basic Create, Read, Update, and Delete (CRUD) operations for the PostgreSQL `school_db` database set up in the Docker Compose environment.

## Connecting to the Database

You can connect to the PostgreSQL container using `psql`. First, find the container name (e.g., `postgres-demo`) using `docker ps`.

```bash
# Connect to the running postgres container
docker exec -it postgres-demo psql -U teacher -d school_db

# You will be prompted for the password ('password123')
```

Once connected, you can run the SQL commands below.

## CREATE (Insert Data)

### Insert a new student
```sql
INSERT INTO students (first_name, last_name, email, birth_date, grade_level)
VALUES ('Alice', 'Green', 'alice.g@school.edu', '2007-03-12', 9);
```

### Insert a new course
```sql
INSERT INTO courses (course_name, description, credit_hours, teacher_name)
VALUES ('Art History', 'Survey of major art movements', 3, 'Ms. Evans');
```

### Enroll an existing student in an existing course
```sql
-- Assuming student Alice Green has id 6 and course Art History has id 6
INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES (6, 6, CURRENT_DATE);
```
*(You might need to find the actual IDs first using SELECT)*

## READ (Query Data)

### Select all students
```sql
SELECT * FROM students;
```

### Select a specific student by email
```sql
SELECT * FROM students WHERE email = 'john.smith@school.edu';
```

### Select all courses taught by a specific teacher
```sql
SELECT * FROM courses WHERE teacher_name = 'Dr. Roberts';
```

### Select students and the courses they are enrolled in (JOIN)
```sql
SELECT
    s.first_name,
    s.last_name,
    c.course_name,
    e.grade
FROM
    students s
JOIN
    enrollments e ON s.id = e.student_id
JOIN
    courses c ON c.id = e.course_id;
```

### Find students enrolled in a specific course (e.g., 'Mathematics 101')
```sql
SELECT
    s.first_name,
    s.last_name
FROM
    students s
JOIN
    enrollments e ON s.id = e.student_id
JOIN
    courses c ON c.id = e.course_id
WHERE
    c.course_name = 'Mathematics 101';
```

## UPDATE (Modify Data)

### Update a student's grade level
```sql
-- Assuming John Smith has id 1
UPDATE students
SET grade_level = 11
WHERE id = 1;
```

### Change a course description
```sql
-- Assuming Biology has id 3
UPDATE courses
SET description = 'Advanced study of cellular biology and genetics'
WHERE id = 3;
```

### Update a grade for an enrollment
```sql
-- Assuming enrollment id 1 needs a grade update
UPDATE enrollments
SET grade = 'A+'
WHERE id = 1;
```
*(You might need to find the specific enrollment id first)*

## DELETE (Remove Data)

### Delete a student by email
```sql
-- This will also delete associated enrollments due to ON DELETE CASCADE
DELETE FROM students WHERE email = 'alice.g@school.edu';
```

### Delete a course
```sql
-- First, ensure no students are enrolled, or delete enrollments first
-- DELETE FROM enrollments WHERE course_id = (SELECT id FROM courses WHERE course_name = 'Art History');
-- Then delete the course
DELETE FROM courses WHERE course_name = 'Art History';
```

### Unenroll a student from a course
```sql
-- Find the enrollment id first if necessary
-- SELECT id FROM enrollments WHERE student_id = 1 AND course_id = 3;
-- Then delete using the id (e.g., if the id is 2)
DELETE FROM enrollments WHERE id = 2;
```
