const bcrypt = require('bcrypt')
const saltRounds = 10

// check if a password matches the hashPassword stored in the db, return true or false
const checkPassword = async (hashPassowrd, plainTextPassword) => {
    return await bcrypt.compare(plainTextPassword, hashPassowrd)
}

// hash password
const hashPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds)
}

module.exports = {
    checkPassword,
    hashPassword
}