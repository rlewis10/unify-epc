const db = require('mongoose')
const User = require('./UserModel')

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

const createUser = async (data) => {
    const user = new User({
        accountId : data.accountId,
        username : data.username,
        password : data.password
    })
    return await user.save()
}

module.exports = {
    createUser: createUser,
    regUser: regUser}