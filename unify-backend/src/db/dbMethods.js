const db = require('mongoose')
const User = require('./UserSchema')

const dbCon = () => {
    try{
        db.connect(process.env.MONGO_DB_PASSWORD, 
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log('connected to DB'))
    }
    catch(e){
        console.log(`error connecting to DB: ${e}`)
    }
}

// find a user Id by username, returns the document Id
const findUserId = async (username) => {}

// create a new user, returns the inserted document
const createUser = async (data) => {
    const user = new User({
        accountId : data.accountId,
        firstName: data.firstName,
        LastName: data.lastName,
        email: data.email,
        username : data.username,
        password : data.password
    })
    return await user.save()
}

// update a user by Id, returns the inserted document
const updateUserbyId = async (id, data) => {}

//

module.exports = {
    createUser: createUser,
    dbCon: dbCon}