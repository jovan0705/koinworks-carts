require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router/index.js')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

// app.listen(PORT, () => {
//     console.log(`app listening to http://localhost:${PORT}`)
// })

module.exports = app