const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'derrick97@ethereal.email',
    pass: 'K5wNEe7fqusrrAXAmD',
  },
})

const mailOptions = {
  from: 'derrick97@ethereal.email',
  to: 'derrick97@ethereal.email',
  subject: 'Someone is trying to reach out to you.',
  text: 'You have got mail.',
  html: html,
  attachments: [],
}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error.message)
  } else {
    console.log('Email sent successfully!', info.messageId)
  }
})