
const express = require('express')
const app = express()
const { body, validationResult } =  require('express-validator')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

const sfRoutes = require('./sf/sfRoutes')
const authRoutes = require('./userAuth/authRoutes')
const dbRoutes = require('./db/dbRoutes')
//const db = require('./db/db.js')

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${app.get('port')}`)
})

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use('/api/sf', sfRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/db', dbRoutes)
