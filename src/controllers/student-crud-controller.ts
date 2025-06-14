import { Request, Response } from 'express';
import studentSchema from '../models/student-model';
import { sendResponse } from '../utils/responce-format';
import { MESSAGE_CODE } from '../utils/message-code';
import { sendEmail } from '../utils/mail-send';
import verificationCodeGmailLogin from '../models/verification-code-gmail-login';



// Function to create a new student
const createStudent = async (req: Request, res: Response) => {
  const generateCode = (): string => Math.floor(100000 + Math.random() * 900000).toString();

  const {
    name,
    secondName,
    email,
    phone,
    pwd,
    status,
    educationLevel,
    code: userCode
  } = req.body;


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

    // Étape 1 : Génération et envoi du code si non fourni
    if (!userCode) {
      const code = generateCode();

      // Supprimer les anciens codes de ce mail
      await verificationCodeGmailLogin.deleteMany({ email });

      // Enregistrement du code temporaire
      await verificationCodeGmailLogin.create({ email, code });

      // Envoi du mail
      await sendEmail({
        destinataire: email,
        subject: 'Code de vérification \n de la creation de votre compte',
        text: `Votre code de vérification est : ${code}`,
        code: code
      });

      return sendResponse({
        res,
        success: true,
        status: 200,
        message: 'Code de vérification envoyé par email.',
        data: {
          code
        }
      });
    }

    // Étape 2 : Vérification du code
    const entry = await verificationCodeGmailLogin.findOne({ email });

    if (!entry || entry.code !== userCode) {
      return sendResponse({
        res,
        success: false,
        status: 401,
        message: 'Code de vérification incorrect ou expiré.',
      });
    }

    //verified que tout les champs sont rempli
    if (!name || !secondName || !email || !phone || !pwd || !status || !educationLevel ) {
      return sendResponse({
        res,
        success: false,
        status: 422,
        message: MESSAGE_CODE.CHAMP_EMPTY,
      });
    }

    // Supprimer le code une fois validé
    await verificationCodeGmailLogin.deleteOne({ email });

    // Étape 3 : Création du compte
    const newStudent = new studentSchema({
      name,
      secondName,
      email,
      phone,
      pwd,
      status,
      educationLevel,

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