
const express = require('express')
const app = express()
const { body, validationResult } =  require('express-validator')

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

//const sfRoutes = require('./routes/sfRoutes')
//const dbRoutes = require('./routes/dbRoutes')
const authRoutes = require('./userAuth/authRoutes')
const apiRoutes = require('./routes/apiRoutes')
//const db = require('./db/db.js')


//app.use('/api/sf', sfRoutes)
//app.use('/api/db', dbRoutes)
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)
