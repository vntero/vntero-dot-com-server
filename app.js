const express = require('express')
const app = express()
const port = 5005

// ---------------------------------- MOONGOOSE -------------------------------------
// 0. Require mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Messages');

  // 1. Define your schema
    let MessageSchema = new mongoose.Schema ({
    name: String,
    email: String,
    message: String
})

// 2. Define your model
    let MessageModel = mongoose.model ('MessageModel', MessageSchema)

    const testMessage = new MessageModel ({
    name: 'Hugo',
    email: 'hugo@hugo.com',
    message: 'Bitcoin is freedom'
    })
    console.log(testMessage)

// 3. Save the model to MongoDB
    await testMessage.save();
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ END OF MOONGOOSE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    
    const firstMessage = new Message ({
        name: 'Hugo',
        email: 'hugo@hugo.com',
        message: 'Is this real life?'
    })
    console.log(firstMessage);
  })

app.get('/api/messages', (req, res) => {
    const messages = [
        {id: 1, title: 'first message'},
        {id: 2, title: 'second message'},
        {id: 3, title: 'third message'}
    ]

    res.json(messages)

})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})