const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')});
const sgMail = require('@sendgrid/mail');
const { creatToken } = require('./auth.services');

const KEY = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(KEY);

exports.SendVerificationMail = async (id, email) => {
  const token = await creatToken(id);
  
  const msg = {
    to: email,
    from: 'mih.s.sidorenko@gmail.com',  
    subject: 'Verification',
    text: 'Verificy your email',
    html: `<a href="localhost:3000/auth/verify/${token}">Confirm your account</a>`,
  };
  return await sgMail.send(msg)
};
