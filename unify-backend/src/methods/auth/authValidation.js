const bcrypt = require('bcrypt')
const dbUser = require('../../methods/db/dbUserMethods')
const token = require('../../methods/auth/token')
const saltRounds = 10

// check if user exists in db, hash password and save new user data to db
// return access and refresh tokens
const signup = async (user, password) => {
    const foundUser = await checkUsername(user.username)
    if (foundUser) {
        throw new Error(`User already exists, try another username`)
    }
    user['hashPassword'] = hashPassword(password)
    const newUser = await dbUser.createUser(user)
    return {
      accessToken : token.genAccessToken(newUser.id), 
      refreshToken : token.genRefreshToken(newUser.id),
      isAuthenticated : true
    }
}

// check if username exists in db, check if user stored hash password matches password submitted
// return access and refresh tokens
const login = async (username, password) => {
    const foundUser = await checkUsername(username)
    const isPasswordCorrect = await checkPassword(foundUser.hashPassword, password)
    if (!foundUser || !isPasswordCorrect) {
      throw new Error(`Incorrect username or password`)
    }
    return {
      accessToken : token.genAccessToken(foundUser.id), 
      refreshToken : token.genRefreshToken(foundUser.id),
      isAuthenticated : true
    }
}

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
    login,
    signup,
    checkUsername,
    checkPassword
}

