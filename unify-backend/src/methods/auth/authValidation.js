const dbUser = require('../../methods/db/dbUserMethods')
const userVal = require('../../methods/auth/userValidation')
const token = require('../../methods/auth/token')


// check if user exists in db, hash password and save new user data to db
// return access and refresh tokens
const signup = async (user, password) => {
    try{
        const foundUser = await userVal.checkUsername(user.username)
        if (foundUser) {
            throw new Error(`User already exists, try another username`)
        }
        user['hashPassword'] = userVal.hashPassword(password)
        const newUser = await dbUser.createUser(user)
        return {
            userId: foundUser.id,
            accessToken : token.genAccessToken(newUser.id), 
            refreshToken : token.genRefreshToken(newUser.id),
            isAuthenticated : true
        }
    }
    catch(e){
        throw new Error(`User already exists, try another username`)
    }
}

// check if username exists in db, check if user stored hash password matches password submitted
// return access and refresh tokens
const login = async (username, password) => {
    try{
        const foundUser = await userVal.checkUsername(username)
        const isPasswordCorrect = await userVal.checkPassword(foundUser.hashPassword, password)
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
    catch(e){
        throw new Error(`Incorrect username or password`)
    }
}

// verify JWT access token, used as an express middleware function
const verifyAccessToken = (req, res, next) => {
    try{
        const bearerToken = req.header('accessToken')
        // send error if no accessToken is sent
        if(!bearerToken) return res.status(401).send({isAuthenticated: false})
        const userId = req.header('userId')
        // send error if no userId is sent
        if(!userId) return res.status(401).send({isAuthenticated: false})
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

module.exports = {
    login,
    signup,
    verifyAccessToken,
    refreshAccessToken
}

