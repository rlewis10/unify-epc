const dbUser = require('../../methods/db/dbUserMethods')
const passVal = require('../../methods/auth/passwordVal')
const token = require('../../methods/auth/token')

// hash password and save new user data to db
// return access and refresh tokens
const signup = async (user, password) => {
    try{
        user['hashPassword'] = userVal.hashPassword(password)
        const newUser = await dbUser.createUser(user)
        return {
            userId: newUser.id,
            accessToken : token.genAccessToken(newUser.id), 
            refreshToken : token.genRefreshToken(newUser.id),
            isAuthenticated : true
        }
    }
    catch(e){
        throw new Error(`Unable to signup`)
    }
}

// check if username exists in db, check if user stored hash password matches password submitted
// return access and refresh tokens
const login = async (username, password) => {
    try{
        const foundUser = await dbUser.findUserId(username)
        const isPasswordCorrect = foundUser ? await passVal.checkPassword(foundUser.hashPassword, password) : false
        if (!foundUser || !isPasswordCorrect) {
          return {
              isAuthenticated: false,
              error: `Incorrect username or password`
            }
        }
        return {
            userId: foundUser.id,
            accessToken : token.genAccessToken(foundUser.id), 
            refreshToken : token.genRefreshToken(foundUser.id),
            isAuthenticated : true
        }
    }
    catch(e){
        throw new Error(`Unable to login`)
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

