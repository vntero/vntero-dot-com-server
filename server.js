// -------------------------------- REQUIREMENTS ---------------------------------
        // ℹ️ Gets access to environment variables/settings
        // https://www.npmjs.com/package/dotenv
require("dotenv/config");

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5005;
const cors = require("cors");
const router = express.Router()

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const MONGODB_URI = process.env.MONGODB_URI

// ------------------------------------- CORS ----------------------------------------
app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );

// ---------------------------------- MOONGOOSE -------------------------------------
        // 0. connect to our database, mongodb
        // LOCALHOST CONNECTION: ------> mongoose.connect('mongodb://127.0.0.1:27017/Messages');
mongoose.connect(MONGODB_URI);
        
        // 1. Define your schema
let MessageSchema = new mongoose.Schema ({
    name: String,
    email: String,
    message: String
})

        // 2. Define your model
let MessageModel = mongoose.model ('MessageModel', MessageSchema)


// ----------------------------------- EXPRESS ------------------------------------
        // the following 2 lines of code are part of deployment on heroku
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

        // this is the home page - root directory
app.get('/', (req, res) => {
    res.send('Back-end is up and running! This is the root directory.')
  })

// --------------------------------------- BACKEND TESTING ROUTES ------------------------------------------------------
        // this is simply another directory (one where we'll handle our form by grabbing the html file)
app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
        // GRAB the form submission into the variable, POST it to our DB and redirect to the home page
app.post('/message', (req, res) => {
    let messageOne = new MessageModel({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })
    messageOne.save()
    res.send('Successfully saved in our DB!')
})
// ---------------- BACKEND TESTING ROUTES WORK SMOOTHLY, ROUTES LOAD AND CREATE ENTRIES IN THE DB ------------------------------

// will handle all POST requests to http:localhost:5005/new-message
app.post('/new-message', (req, res) => {  
    const {name, email, message} = req.body;
    
    MessageModel.create({name, email, message})
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

        // the following lines of code are part of deployment on heroku
app.use((req, res, next) => {
	// If no routes match, send them the React HTML.
	res.sendFile(__dirname + "/build/index.html");
});

    
app.listen(PORT, () => {
    console.log(`SERVER RUNNING at http://localhost:${PORT}`)
})

