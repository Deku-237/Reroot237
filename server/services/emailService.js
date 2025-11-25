const nodemailer = require('nodemailer');
const { translate } = require('./i18nService');

// Configure email transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Email templates
const templates = {
  verification: (data) => ({
    subject: translate(data.language, 'EMAIL_VERIFICATION_SUBJECT'),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FF8C00; font-size: 28px; margin-bottom: 10px;">ReRoot</h1>
          <p style="color: #666; font-size: 16px;">${translate(data.language, 'WELCOME_TO_REROOT')}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-bottom: 20px;">${translate(data.language, 'VERIFY_EMAIL_TITLE')}</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            ${translate(data.language, 'VERIFY_EMAIL_MESSAGE', { name: data.name })}
          </p>
          
          <div style="text-align: center;">
            <a href="${data.verificationUrl}" 
               style="background: #FF8C00; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              ${translate(data.language, 'VERIFY_EMAIL_BUTTON')}
            </a>
          </div>
        </div>
        
        <div style="text-align: center; color: #999; font-size: 14px;">
          <p>${translate(data.language, 'EMAIL_FOOTER')}</p>
          <p>${translate(data.language, 'IGNORE_EMAIL_MESSAGE')}</p>
        </div>
      </div>
    `
  }),

  'password-reset': (data) => ({
    subject: translate(data.language, 'PASSWORD_RESET_SUBJECT'),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #FF8C00; font-size: 28px; margin-bottom: 10px;">ReRoot</h1>
          <p style="color: #666; font-size: 16px;">${translate(data.language, 'PASSWORD_RESET_GREETING')}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
          <h2 style="color: #333; margin-bottom: 20px;">${translate(data.language, 'RESET_PASSWORD_TITLE')}</h2>
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            ${translate(data.language, 'RESET_PASSWORD_MESSAGE', { name: data.name })}
          </p>
          
          <div style="text-align: center;">
            <a href="${data.resetUrl}" 
               style="background: #FF8C00; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              ${translate(data.language, 'RESET_PASSWORD_BUTTON')}
            </a>
          </div>
          
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            ${translate(data.language, 'RESET_LINK_EXPIRES')}
          </p>
        </div>
        
        <div style="text-align: center; color: #999; font-size: 14px;">
          <p>${translate(data.language, 'EMAIL_FOOTER')}</p>
          <p>${translate(data.language, 'IGNORE_EMAIL_MESSAGE')}</p>
        </div>
      </div>
    `
  })
};

async function sendEmail({ to, subject, template, data }) {
  try {
    const emailTemplate = templates[template](data);
    
    const mailOptions = {
      from: `"ReRoot" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

module.exports = { sendEmail };