const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env')});
const sgMail = require('@sendgrid/mail');
const jwt = require("jsonwebtoken");
const { creatToken } = require('./auth.services');

const PORT = process.env.PORT;
const KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(KEY);



exports.SendVerificationMail = (id, email) => {
const token = await creatToken(id);
  const msg = {
    to: email,
    from: 'mih.s.sidorenko@gmail.com',  
    subject: 'Verification',
    text: 'Verification your email',
    html: `<a href="localhost:${PORT}/auth/verify/${token}">Confirm your account</a>`,
  };
  return await sgMail.send(msg)
};
