-- Create students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    birth_date DATE,
    grade_level INTEGER CHECK (grade_level BETWEEN 1 AND 12),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create courses table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    credit_hours INTEGER NOT NULL,
    teacher_name VARCHAR(100)
);

-- Create enrollments table (to demonstrate relationships)
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    grade VARCHAR(2),
    UNIQUE(student_id, course_id)
);

-- Insert sample students
INSERT INTO students (first_name, last_name, email, birth_date, grade_level) VALUES
('John', 'Smith', 'john.smith@school.edu', '2006-05-10', 10),
('Emma', 'Johnson', 'emma.j@school.edu', '2007-08-15', 9),
('Michael', 'Williams', 'michael.w@school.edu', '2005-11-22', 11),
('Sophia', 'Brown', 'sophia.b@school.edu', '2008-02-28', 8),
('William', 'Jones', 'william.j@school.edu', '2006-07-14', 10);

-- Insert sample courses
INSERT INTO courses (course_name, description, credit_hours, teacher_name) VALUES
('Mathematics 101', 'Introduction to algebra and geometry', 3, 'Dr. Roberts'),
('English Literature', 'Classic literature and composition', 3, 'Ms. Thompson'),
('Biology', 'Study of living organisms', 4, 'Mr. Davis'),
('History', 'World history from 1900 to present', 3, 'Mrs. Garcia'),
('Computer Science', 'Introduction to programming concepts', 4, 'Dr. Wilson');

-- Insert sample enrollments
INSERT INTO enrollments (student_id, course_id, enrollment_date, grade) VALUES
(1, 1, '2023-09-01', 'A'),
(1, 3, '2023-09-01', 'B+'),
(2, 2, '2023-09-02', 'A-'),
(2, 4, '2023-09-02', 'B'),
(3, 1, '2023-09-01', 'C+'),
(3, 5, '2023-09-03', 'A'),
(4, 3, '2023-09-02', 'B-'),
(4, 4, '2023-09-02', 'A'),
(5, 2, '2023-09-01', 'B'),
(5, 5, '2023-09-01', 'A-');