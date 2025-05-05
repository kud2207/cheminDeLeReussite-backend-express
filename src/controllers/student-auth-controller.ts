import { Request, Response } from 'express';
import { sendResponse } from '../utils/responce-format';
import { MESSAGE_CODE } from '../utils/message-code';
import studentSchema from '../models/student-model';
import { signToken } from '../utils/jwt';
import { JWT_SECRET } from '../interfaces/donne-interface';
import { AuthRequest } from '../middlewares/auth-token-middleware';


//login student
export const loginStudent = async (req: Request, res: Response) => {
    const { phone, pwd } = req.body;

    try {
        if (!phone || !pwd) {
            return sendResponse({
                res,
                success: false,
                status: 400,
                message: MESSAGE_CODE.CHAMP_EMPTY,
            });
        }

        // Recherche de l'étudiant
        const student = await studentSchema.findOne({ phone });

        if (!student || student.pwd !== pwd) {
            return sendResponse({
                res,
                success: false,
                status: 401,
                message: 'Numéro ou mot de passe incorrect.',
            });
        }

        // Création du token avec toutes les données de l'étudiant
        const token = signToken({
            payload: {
                _id: student._id,
                name: student.name,
                secondName: student.secondName,
                email: student.email,
                phone: student.phone,
                status: student.status,
                educationLevel: student.educationLevel,
                interests: student.interests,
                cv: student.cv,
                profilePhoto: student.profilePhoto
            },
            secret: JWT_SECRET,
            time: '1h'
        });

        return sendResponse({
            res,
            success: true,
            status: 200,
            message: 'Connexion réussie.',
            data: {
                token,
                student,
            },
        });

    } catch (error) {
        console.error('Erreur de connexion :', (error as Error).message);
        return sendResponse({
            res,
            success: false,
            status: 500,
            message: 'Erreur interne du serveur.',
        });
    }
};

//verifi token student
export const IsVerifiedToken = async(req:AuthRequest, res: Response)=>{
    sendResponse({
        res,
        success: true,
        status: 200,
        message: 'Accès autorisé.',
        data: req.user,
      });
}