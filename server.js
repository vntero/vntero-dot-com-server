// -------------------------------- REQUIREMENTS ---------------------------------
const express = require('express')
const app = express()
const port = 5005
const cors = require("cors");

const mongoose = require('mongoose');

const bodyParser = require('body-parser'); 

// ---------------------------- Middleware configuration ----------------------------
module.exports = (app) => {
    // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
    // Services like heroku use something called a proxy and you need to add this to your server
    app.set("trust proxy", 1);
  
    // controls a very specific header to pass headers from the frontend
    app.use(
      cors({
        credentials: true,
        origin: process.env.ORIGIN || "http://localhost:3000",
      })
    );
  
    // In development environment the app logs
    app.use(logger("dev"));
  
    // To have access to `body` property in the request
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  
    // Handles access to the favicon
  };

// ---------------------------------- MOONGOOSE -------------------------------------
        // 0. connect to our database, mongodb
mongoose.connect('mongodb://127.0.0.1:27017/Messages');

        // 1. Define your schema
let MessageSchema = new mongoose.Schema ({
    name: String,
    email: String,
    message: String
})

        // 2. Define your model
let MessageModel = mongoose.model ('MessageModel', MessageSchema)

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ END OF MOONGOOSE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

// ----------------------------------- EXPRESS ------------------------------------
app.use(bodyParser.urlencoded({extended: false}));

        // this is the home page - root directory
app.get('/', (req, res) => {
    res.send('Back-end is up and running! This is the root directory.')
  })

        // this is simply another directory (one where we'll handle our form by grabbing the html file)
app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
        // GRAB the form submission into the variable, POST it to our DB and redirect to the home page
app.post('/message', (req, res) => {
    let messageOne = new MessageModel({
        name: req.body.Name,
        email: req.body.Email,
        message: req.body.Message
    })
    messageOne.save()
    res.redirect('/')
})
    
app.listen(port, () => {
    console.log(`SERVER RUNNING at http://localhost:${port}`)
})

