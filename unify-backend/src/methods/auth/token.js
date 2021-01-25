const jwt = require('jsonwebtoken')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

// create JWT access token with 1hr expiry
const genAccessToken = (userId, username) => {
    let payload = {
        userId : userId,
        username: username,
        type: 'access token'
    }
    let token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256', 
        expiresIn: '1hr'
    })
    return token
}

// create JWT refresh token with 1day expiry, used to request a new access token if the access token has expired
const genRefreshToken = (userId, username) => {
    let payload = {
        userId : userId,
        username: username,
        type: 'refresh token'
    }
    let token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d'
    })
    return token
}

// generate new accress token using refresh token
const refreshAccessToken = async (user, refreshToken) => {
    // send error if no refreshToken is sent
    if(!refreshToken){throw new Error(`Invalid Token`)}
    //extract payload from refresh token and generate a new access token and send it
    const verifedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    // check if user matches user in token
    if(user.username !== verifedRefreshToken.username){
        throw new Error(`Token doesn't match user: ${JSON.stringify(verifedRefreshToken.username)}`)
    }
    return genAccessToken()
}

// verify JWT access token
const verifyAccessToken = (req, res, next) => {
    try{
        const bearerHeader = req.header('accessToken')
        // send error if no accessToken is sent
        if(!bearerHeader) return res.status(401).send('Invalid token')
        const bearerToken = bearerHeader.split(' ')[1]

        const verified = jwt.verify(bearerToken, process.env.JWT_ACCESS_TOKEN_SECRET)
        res.auth = verified
        next()
    }
    catch(e){
        res.status(403).send(`Unauthorized: ${e}`)
    }
}

module.exports = {
    genAccessToken,
    genRefreshToken,
    refreshAccessToken,
    verifyAccessToken
}