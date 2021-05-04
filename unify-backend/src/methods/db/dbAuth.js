const db = require('mongoose')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

// connection to mongoDB
const dbConn = () => {
    try{
        db.connect(process.env.MONGO_DB_PASSWORD, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useFindAndModify: false
            },
            () => console.log('connected to DB'))
    }
    catch(e){
        console.log(`error connecting to DB: ${e}`)
    }
}

module.exports = {dbConn : dbConn}