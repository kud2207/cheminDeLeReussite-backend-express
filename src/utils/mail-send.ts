import nodemailer from 'nodemailer';

export interface EmailParams {
  expéditeur?: string;
  expéditeurPWD?: string;
  destinataire: string;
  subject: string;
  text?: string;
  code?: string; 
}

export const sendEmail = async (params: EmailParams): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: params.expéditeur || "chemindelareussite2ka@gmail.com",
        pass: params.expéditeurPWD || "xtww gyvg pcmn mepe"
      }
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" width="100" style="margin-bottom: 20px;" />
        <h2 style="color: #2c3e50;">Bienvenue sur <strong>Chemin de la Réussite</strong></h2>
        <p style="font-size: 16px; color: #333;">Voici votre code de vérification :</p>
        <p style="font-size: 28px; font-weight: bold; color: #e74c3c; margin: 20px 0;">
          ${params.code || ''}
        </p>
        <p style="font-size: 14px; color: #777;">Ne partagez ce code avec personne.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Chemin de la Réussite" <${params.expéditeur || "chemindelareussite2ka@gmail.com"}>`,
      to: params.destinataire,
      subject: params.subject,
      text: params.text || `Votre code est : ${params.code}`,
      html: htmlContent
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email :', (error as Error).message);
  }
};
