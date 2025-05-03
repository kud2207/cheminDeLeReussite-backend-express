import nodemailer from 'nodemailer';

export interface EmailParams {
    expéditeur?: string;
    expéditeurPWD?: string;
    expéditeurINFO: string;
    destinataire: string;
    subject: string;
    text?: string;
    html?: string;
}

export const sendEmail = async (params: EmailParams): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: params.expéditeur || "ulrichkageu@gmail.com", //chemindelareussite2ka@gmail.com
                pass: params.expéditeurPWD || "Kazzeu-Kageu-2001-2002"  //PWD application https://myaccount.google.com/apppasswords 
            }
        });

        const info = await transporter.sendMail({
            from: params.expéditeurINFO,
            to: params.destinataire,
            subject: params.subject,
            text: params.text,
            html: params.html
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Erreur lors de l’envoi de l’email :', (error as Error).message);
        
    }
};
