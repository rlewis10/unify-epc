const bcrypt = require('bcrypt')
const dbUser = require('../db/dbUserMethods')
const saltRounds = 10


// check if username is already exists in the db, return the founduser or false
const checkUsername = async (userid) => {
    const foundUser = await dbUser.findUserId(userid)
    return (foundUser ? foundUser : false)
}

// check if a password matches the hashPassword stored in the db, return true or false
const checkPassword = async (hashPassowrd, plainTextPassword) => {
    return await bcrypt.compare(plainTextPassword, hashPassowrd)
}

// hash password
const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds)
}

module.exports = {
    checkUsername,
    checkPassword,
    hashPassword
}