const nodemailer = require('nodemailer')
require("dotenv/config");

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.ICLOUD,
    pass: process.env.PW,
  },
  tls: {
    rejectUnauthorized: false
  }
})

const mailOptions = {
  from: process.env.ICLOUD,
  to: process.env.GMAIL,
  subject: 'You have a new message!',
  text: 'Hello World!',
  html: 'Hakuna Matata',
  attachments: [],
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error.message)
  } else {
    console.log('Email sent successfully!', info.messageId)
  }
})