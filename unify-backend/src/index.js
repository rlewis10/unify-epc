
const express = require('express')
const app = express()
const { body, validationResult } =  require('express-validator')
const {dbConn} = require('./methods/db/dbMethodsConn')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${app.get('port')}`)
})

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// initialise the database connection 
dbConn()

const sfRoutes = require('./routes/sfRoutes')
const apiRoutes = require('./routes/apiRoutes')
const authRoutes = require('./routes/auth/authRoutes')

app.use('/sf', sfRoutes)
app.use('/api', apiRoutes)
app.use('/auth', authRoutes)
