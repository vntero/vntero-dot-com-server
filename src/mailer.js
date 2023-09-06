const nodemailer = require('nodemailer')

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <title>Email document - Order is Ready</title>
  <style>
    @media screen and (max-width: 480px) {
      .card {
          width: 70%;
      }
      .details-title {
          min-width: 100%;
      }
    }
  </style>
</head>
<body style="background-color: #F9F9FB; font-family: Trebuchet MS;">

</body>
</html>
`

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