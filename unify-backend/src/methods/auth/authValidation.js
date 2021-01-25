const crypto = require('crypto')

const newLogin = async (userid, password) => {
    // check if username is already taken
    // generate a pair of tokens and send
}

const checkPassword = async (userid, password) => {}

const logout = async () => {}

module.exports = {
    login,
    checkPassword,
    logout
}

