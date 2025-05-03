import mongoose from 'mongoose';

const verificationCodeGmailLoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 } // expire après 600 secondes = 10 minutes
});

export default mongoose.model('VerificationCodeGmailLogin', verificationCodeGmailLoginSchema);
