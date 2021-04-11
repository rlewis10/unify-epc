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
        userId: foundUser.id,
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
        userId: foundUser.id,
        accessToken : token.genAccessToken(foundUser.id), 
        refreshToken : token.genRefreshToken(foundUser.id),
        isAuthenticated : true
    }
}

// verify JWT access token, used as an express middleware function
const verifyAccessToken = (req, res, next) => {
    try{
        const bearerToken = req.header('accessToken')
        // send error if no accessToken is sent
        if(!bearerToken) return res.status(401).send('No token in header')
        const userId = req.header('userId')
        // send error if no userId is sent
        if(!userId) return res.status(401).send('No UserId in header')
        // verify JWT token with secret
        const verifiedToken = token.verifyJWT(userId, bearerToken, 'access')
        // send result
        if(verifiedToken){
            res.auth = verifiedToken
            next()
        }
        else{
            res.status(401).send(`Unauthorized`)
        }
    }
    catch(e){
        res.status(401).send(`Unauthorized: ${e}`)
    }
}

// generate new JWT access token using JWT refresh token
const refreshAccessToken = async (userId, refreshToken) => {
    try{
        // check if user matches user in token
        const verifedRefreshToken = token.verifyJWT(userId, refreshToken, 'refresh')
        // generate new access token
        return (verifedRefreshToken ? token.genAccessToken(userId) : false) 
    }
    catch(e){
        throw new Error(`Unable to refresh Token: ${e}`)
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
    checkPassword,
    verifyAccessToken,
    refreshAccessToken
}

