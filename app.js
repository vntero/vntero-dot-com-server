// -------------------------------- REQUIREMENTS ---------------------------------
const express = require('express')
const app = express()
const port = 5005

const mongoose = require('mongoose');

const bodyParser = require('body-parser'); 

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

app.get('/', (req, res) => {
    res.send('Back-end is up and running! This is the root directory.')
  })

app.get('/message', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

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

