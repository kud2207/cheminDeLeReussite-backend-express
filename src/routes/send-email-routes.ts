import express from 'express';
import { sendStageConfirmation } from '../controllers/confirme-stage-controller';


const sendEmailConfirmation = express.Router();

// (API Base): http://localhost:3001/emailMessage

// Send email stage confirmation
sendEmailConfirmation.post('/', sendStageConfirmation);


export {
    sendEmailConfirmation
};
