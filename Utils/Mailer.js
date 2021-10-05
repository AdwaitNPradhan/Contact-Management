"use strict";
const nodemailer = require("nodemailer");
require("dotenv/config"); // Getting the .env variables for sensitive data protection
/**
 *
 * @param  reciever
 * @param  subject
 * @param  textBody
 * @param  htmlBody
 * @returns
 */
async function sendMail(reciever, subject, textBody, htmlBody) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `AlgoSimulate <noreply@algoritmolab.com>`,
    to: `${reciever}`,
    subject: `${subject}`,
    text: `${textBody}`,
    html: `${htmlBody}`,
  });
  return info;
}

module.exports = sendMail;

// https://github.com/log4js-node/smtp
