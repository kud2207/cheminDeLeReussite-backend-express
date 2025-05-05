import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/student-crud-controller';
import { IsVerifiedToken, loginStudent } from '../controllers/student-auth-controller';
import { verifyToken } from '../middlewares/auth-token-middleware';

const studentRoutes = express.Router();

// (API Base): http://localhost:3001/student

studentRoutes.post('/login', loginStudent); //Login student

studentRoutes.post('/create', createStudent); //Create a new student

studentRoutes.get('/', getAllStudents); //Get all students

studentRoutes.get('/:id', getStudentById); //Get a student by ID

studentRoutes.put('/update/:id', updateStudent); //Update a student by ID

studentRoutes.delete('/delete/:id', deleteStudent); //Delete a student by ID

studentRoutes.post('/monprofil', verifyToken, IsVerifiedToken); //verification token student

export {
  studentRoutes
};

