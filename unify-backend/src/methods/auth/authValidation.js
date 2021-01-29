const bcrypt = require('bcrypt')
const saltRounds = 10

const newLogin = async (userid, password) => {
    // check if username is already taken
    // store username & password in db
}

// hash password and store
const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds)
}

// check if a password matches the hashPassword stored in the db
const checkPassword = async (hashPassowrd, plainTextPassword) => {
    return await bcrypt.compare(plainTextPassword, hashPassowrd)
}

module.exports = {
    newLogin,
    hashPassword,
    checkPassword
}

