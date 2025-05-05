import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../interfaces/donne-interface';
import { sendResponse } from '../utils/responce-format';

export interface AuthRequest extends Request {
    user?: any;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        return sendResponse({
            res,
            success: false,
            status: 401,
            message: 'Token manquant.',
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return sendResponse({
            res,
            success: false,
            status: 401,
            message: 'Token invalide.',
        });
    }
}
