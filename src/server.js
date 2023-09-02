// -------------------------------- REQUIREMENTS ---------------------------------
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000;
const cors = require("cors");
const router = express.Router()

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const MONGODB_URI = process.env.MONGODB_URI

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

// ------------------------------------- CORS ----------------------------------------
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN || 3000,
  })
);

// ---------------------------------- MOONGOOSE -------------------------------------
// 0. connect to our database, mongodb
// LOCALHOST CONNECTION: ------> mongoose.connect('mongodb://127.0.0.1:27017/Messages');
mongoose.connect(MONGODB_URI);

// 1. Define your schema 
let MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
})

// 2. Define your model
let MessageModel = mongoose.model('MessageModel', MessageSchema)


// ----------------------------------- EXPRESS ------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// this is the home page - root directory
app.get('/', (req, res) => {
  res.send('Back-end is up and running! This is the root directory.')
})

// --------------------------------------- BACKEND TESTING ROUTES ------------------------------------------------------
// this is simply another directory (one where we'll handle our form by grabbing the html file)
app.get('/d4l', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
// GRAB the form submission into the variable, POST it to our DB and redirect to the home page
app.post('/d4l', (req, res) => {
  let messageOne = new MessageModel({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  })
  messageOne.save()
  res.send('Successfully saved in our DB!')
})

// --------------------------------------- RETRIEVE ALL MESSAGES SAVED IN OUR DB ------------------------------------------------

app.get('/retriever', (req, res) => {
  res.send('Here we shall see all messages saved in our db:')

})

// ---------------- BACKEND TESTING ROUTES WORK SMOOTHLY, ROUTES LOAD AND CREATE ENTRIES IN THE DB ------------------------------

// will handle all POST requests to http:localhost:5005/new-message
app.post('/new-message', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`SERVER RUNNING at http://localhost:${PORT}`)
})

