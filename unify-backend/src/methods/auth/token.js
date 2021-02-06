const jwt = require('jsonwebtoken')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

// create JWT access token with 1hr expiry
const genAccessToken = (userId) => {
    let payload = {
        userId : userId,
        type: 'access token'
    }
    let token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256', 
        expiresIn: '1hr'
    })
    return token
}

// create JWT refresh token with 1day expiry, used to request a new access token if the access token has expired
const genRefreshToken = (userId) => {
    let payload = {
        userId : userId,
        type: 'refresh token'
    }
    let token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d'
    })
    return token
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

// generate new JWT access token using JWT refresh token
const refreshAccessToken = async (userId, refreshToken) => {
    // send error if no refreshToken is sent
    if(!refreshToken){throw new Error(`Invalid Token`)}
    //extract payload from refresh token and generate a new access token and send it
    const verifedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    // check if user matches user in token
    if(userId !== verifedRefreshToken.userId){
        throw new Error(`Token doesn't match user: ${JSON.stringify(verifedRefreshToken.userId)}`)
    }
    return genAccessToken(userId)
}

module.exports = {
    genAccessToken,
    genRefreshToken,
    verifyAccessToken,
    refreshAccessToken
}