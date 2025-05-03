import { Request, Response } from 'express';
import studentSchema from '../models/student-model';
import { sendResponse } from '../utils/responce-format';
import { MESSAGE_CODE } from '../utils/message-code';
import { sendEmail } from '../utils/mail-send';


// Function to create a new student
const createStudent = async (req: Request, res: Response) => {

  // creation du code de verification
  const generateCode = (): string => Math.floor(100000 + Math.random() * 900000).toString();
  const {
    name,
    secondName,
    email,
    phone,
    status,
    educationLevel,
    interests,
    cv,
    profilePhoto,
    code: userCode 
  } = req.body;

  if (!name || !secondName || !email || !phone || !status || !educationLevel || !interests) {
    return sendResponse({
      res,
      success: false,
      status: 422,
      message: MESSAGE_CODE.CHAMP_EMPTY,
    });
  }

  try {
    const existingStudent = await studentSchema.findOne({ email });
    if (existingStudent) {
      return sendResponse({
        res,
        success: false,
        status: 409,
        message: MESSAGE_CODE.EMAIL_ALREADY_EXISTS,
      });
    }

    //si aucun code n'est fourni, envoyer le code par mail
    if (!userCode) {
      const code = generateCode();
      try {
        await sendEmail({
          expéditeurINFO: 'chemindelareussite une nouvelle methode educatif',
          destinataire: email,
          subject: 'Code de vérification \n de la creation de votre compte',
          text: `Votre code de vérification est : ${code}`,
        });
        
        return sendResponse({
          res,
          success: true,
          status: 200,
          message: 'Code de vérification envoyé par email.',
          data: { code },
        });
      } catch (error) {
        console.error('Erreur or de Envoie:', (error as Error).message);
      }
      
    }
      

    //Vérification du code
    const expectedCode = req.body.expectedCode;
    if (userCode !== expectedCode) {
      return sendResponse({
        res,
        success: false,
        status: 401,
        message: 'Code de vérification incorrect',
      });
    }

    //Création du compte si tout est valide
    const newStudent = new studentSchema({
      name,
      secondName,
      email,
      phone,
      status,
      educationLevel,
      interests,
      cv,
      profilePhoto,
    });

    const savedStudent = await newStudent.save();

    sendResponse({
      res,
      success: true,
      status: 201,
      message: MESSAGE_CODE.STUDENT_CREATE_SUCCESS,
      data: savedStudent,
    });

  } catch (error) {
    console.error('Erreur création étudiant:', (error as Error).message);
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.STUDENT_CREATE_ERROR,
    });
  }
};

// Get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentSchema.find();
    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.STUDENT_FETCH_SUCCESS,
      data: students,
    });
  } catch (error) {
    console.error('Erreur récupération étudiants:', (error as Error).message);
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.STUDENT_FETCH_ERROR,
    });
  }
};

// Get a student by ID
const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const student = await studentSchema.findById(id);
    if (!student) {
      return sendResponse({
        res,
        success: false,
        status: 404,
        message: MESSAGE_CODE.STUDENT_NOT_FOUND,
      });
    }
    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.STUDENT_FETCH_SUCCESS,
      data: student,
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.STUDENT_FETCH_ERROR,
    });
  }
};

// Update a student
const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedStudent = await studentSchema.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedStudent) {
      return sendResponse({
        res,
        success: false,
        status: 404,
        message: MESSAGE_CODE.STUDENT_NOT_FOUND,
      });
    }

    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.STUDENT_UPDATE_SUCCESS,
      data: updatedStudent,
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.STUDENT_UPDATE_ERROR,
    });
  }
};

// Delete a student
const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedStudent = await studentSchema.findByIdAndDelete(id);
    if (!deletedStudent) {
      return sendResponse({
        res,
        success: false,
        status: 404,
        message: MESSAGE_CODE.STUDENT_NOT_FOUND,
      });
    }

    sendResponse({
      res,
      success: true,
      status: 200,
      message: MESSAGE_CODE.STUDENT_DELETE_SUCCESS,
    });
  } catch (error) {
    sendResponse({
      res,
      success: false,
      status: 500,
      message: MESSAGE_CODE.STUDENT_DELETE_ERROR,
    });
  }
};

export {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};