const path = require('path');
require('dotenv').config();
const key = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(key);
const msg = {
  to: 'migho@i.ua',
  from: 'mih.s.sidorenko@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'TEST',
  html: '<strong>TEST</strong>',
};

async function main() {
  const result = await sgMail.send(msg);
  console.log(result);
}

main();
