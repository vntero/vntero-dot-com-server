// ---------------- IMPORTS ----------------
require("dotenv/config")

const express = require('express')

const app = express()

const cors = require("cors")

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const nodemailer = require('nodemailer')

// ---------------- CORS ----------------
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || 3000,
  })
);

// ---------------- DATABASE ----------------
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000;
const db = mongoose.connection

// 0. connect to our database, mongodb
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

mongoose.connect(MONGODB_URI);

// 1. Define your schema 
let MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
})

// 2. Define your model
let MessageModel = mongoose.model('MessageModel', MessageSchema)


// ---------------- EXPRESS ----------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// this is the home page - root directory
app.get('/', (req, res) => {
  res.send('Back-end is up and running! This is the root directory.')
})

// ---------------- SAVES FORM IN THE DB ----------------
app.post('/new-message', (req, res) => {
  console.log(req.body)
  const { name, email, message } = req.body;

  MessageModel.create({ name, email, message })
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})

// ---------------- SENDS FORM AS AN EMAIL ----------------
app.post('/new-email', (req, res) => {
  const { name, email, message } = req.body

  // ----- NODEMAILER -----
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
            <h2>${name} left you a message!</h2>
            <p>${email}.</p>
            <p>${message}</p>
        </div>
        <div class="footer">
            <p>Copyright &copy; 2023 @ vntero</p>
            <p>Visit our website: <a href="https://www.vntero.com">www.vntero.com</a></p>
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

})

// ---------------- LISTENER ----------------
app.listen(PORT, () => {
  console.log(`SERVER RUNNING at http://localhost:${PORT}`)
})