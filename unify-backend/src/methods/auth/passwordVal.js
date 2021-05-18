const bcrypt = require('bcrypt')
const saltRounds = 10

// check if a password matches the hashPassword stored in the db, return true or false
const checkPassword = async (hashPassowrd, plainTextPassword) => {
    return await bcrypt.compare(plainTextPassword, hashPassowrd)
}

// hash password
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    checkPassword,
    hashPassword
}