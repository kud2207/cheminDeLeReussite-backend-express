import { Request, Response } from 'express';
import { sendEmail } from '../utils/mail-send';
import { MESSAGE_CODE } from '../utils/message-code';
import { sendResponse } from '../utils/responce-format';

interface StageConfirmationParams {
  destinataire: string;
  nomEtudiant: string;
  dateEntretien: string;
  heureEntretien: string;
  local: string;
  contactResponsable?: string;
  informationsSupplementaires?: string;
}

export const sendStageConfirmation = async (req: Request, res: Response) => {
  const {
    destinataire,
    nomEtudiant,
    dateEntretien,
    heureEntretien,
    local,
    contactResponsable,
    informationsSupplementaires
  }: StageConfirmationParams = req.body;

  try {
    // Validation des champs obligatoires
    if (!destinataire || !nomEtudiant || !dateEntretien || !heureEntretien || !local) {
      return sendResponse({
        res,
        success: false,
        status: 422,
        message: MESSAGE_CODE.CHAMP_EMPTY,
      });
    }

    // Formatage de la date
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const dateFormatee = formatDate(dateEntretien);

    // Construction du contenu HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" width="100" style="margin-bottom: 20px;" />
        <h2 style="color: #2c3e50;">Confirmation de votre entretien de stage</h2>
        
        <p>Bonjour ${nomEtudiant},</p>
        
        <p>Nous avons le plaisir de vous informer que votre candidature pour le stage a été retenue.</p>
        
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: left;">
          <h3 style="color: #2c3e50; margin-top: 0;">Détails de l'entretien :</h3>
          <ul style="padding-left: 20px;">
            <li><strong>Date :</strong> ${dateFormatee}</li>
            <li><strong>Heure :</strong> ${heureEntretien}</li>
            <li><strong>Lieu :</strong> ${local}</li>
            ${contactResponsable ? `<li><strong>Contact :</strong> ${contactResponsable}</li>` : ''}
          </ul>
        </div>
        
        ${informationsSupplementaires ? `
        <div style="background-color: #e9f7ef; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: left;">
          <h4 style="color: #2c3e50; margin-top: 0;">Informations importantes :</h4>
          <p>${informationsSupplementaires}</p>
        </div>
        ` : ''}
        
        <p>Merci de bien vouloir vous présenter à l'heure au lieu indiqué.</p>
        
        <p>Cordialement,</p>
        <p><strong>L'équipe des stages - Chemin de la Réussite</strong></p>
      </div>
    `;

    // Envoi de l'email
    await sendEmail({
      destinataire,
      subject: 'Confirmation de votre entretien de stage',
      html: htmlContent
    });

    sendResponse({
      res,
      success: true,
      status: 200,
      message: 'Email de confirmation envoyé avec succès',
    });

  } catch (error) {
    console.error("Erreur envoi confirmation de stage:", error);
    sendResponse({
      res,
      success: false,
      status: 500,
      message: 'MESSAGE_CODE.EMAIL_SENT_ERROR',
    });
  }
};