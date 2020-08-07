const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')});
const sgMail = require('@sendgrid/mail');

const KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(KEY);

exports.SendVerificationMail = async (verificationToken, email) => {

  const msg = {
    to: email,
    from: 'mih.s.sidorenko@gmail.com',  
    subject: 'Verification',
    text: 'Verify your email',
    html: `<a href="http://localhost:3000/auth/verify/${verificationToken}">Confirm your account</a>`,
  };
  return await sgMail.send(msg)
};
