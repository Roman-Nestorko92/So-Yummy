const nodemailer = require('nodemailer');
require('dotenv').config();

const { UKR_NET_PASSWORD, UKR_NET_USER } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_USER,
    pass: UKR_NET_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  const email = { ...data, from: UKR_NET_USER };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
