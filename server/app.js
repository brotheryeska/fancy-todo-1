const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})