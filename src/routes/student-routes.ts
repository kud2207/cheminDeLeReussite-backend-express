import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/student-controller';

const studentRoutes = express.Router();

// (API Base): http://localhost:3000/student

//Create a new student
studentRoutes.post('/create', createStudent);

//Get all students
studentRoutes.get('/', getAllStudents);

//Get a student by ID
studentRoutes.get('/:id', getStudentById);

//Update a student by ID
studentRoutes.put('/update/:id', updateStudent);

//Delete a student by ID
studentRoutes.delete('/delete/:id', deleteStudent);

export {
  studentRoutes
};
