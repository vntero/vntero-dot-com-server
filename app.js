const express = require('express')
const app = express()
const port = 5005

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('This is a test. Does this port work?')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})