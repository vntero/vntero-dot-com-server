const nodemailer = require('nodemailer')
require("dotenv/config");


const html=`
<!DOCTYPE html>
<html>
<head>
    <title>Your Modern Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }

        .header {
            background-color: #007BFF;
            color: #fff;
            text-align: center;
            padding: 20px 0;
        }

        .content {
            padding: 20px;
        }

        .footer {
            text-align: center;
            color: #888;
            padding: 20px 0;
        }

        a {
            color: #007BFF;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Your Company</h1>
        </div>
        <div class="content">
            <h2>Hello, ${}</h2>
            <p>This is a sample email message with a modern and minimalist design. You can customize the content here.</p>
            <p>Feel free to add more text, images, and links to create your message.</p>
            <p>Thank you for choosing us!</p>
        </div>
        <div class="footer">
            <p>Copyright &copy; 2023 Your Company</p>
            <p>Visit our website: <a href="https://www.yourcompany.com">www.yourcompany.com</a></p>
        </div>
    </div>
</body>
</html>
`

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