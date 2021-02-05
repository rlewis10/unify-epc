const express = require('express')
const app = express()
const { body, validationResult } =  require('express-validator')
const sfAuth = require('./methods/sf/sfAuth')
const { dbConn } = require('./methods/db/dbAuth')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

// set port number
app.set('port', process.env.PORT || 3001)

// init response when app is started
app.listen(app.get('port'), function () {
  console.log(`Unify EPC - listening on port ${app.get('port')}`)
})

// express middleware to handle incoming post requests
app.use(express.urlencoded({extended: true}))

app.use(express.json())

// initalise salesforce connection
sfAuth.get().then((token) => {
  console.log(token)
  console.log(sfAuth.tokens)
})

// initialise the database connection 
dbConn()

// setup routing 
const sfRoutes = require('./routes/sf/sfAllRoutes')
const apiRoutes = require('./routes/api/apiRoutes')
const authRoutes = require('./routes/auth/authRoutes')

app.use('/sf', sfRoutes)
app.use('/api', apiRoutes)
app.use('/auth', authRoutes)
