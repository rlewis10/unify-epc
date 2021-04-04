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

// verify JWT token matches userId
const verifyJWT = (userId, token, tokenType) => {
    try{
        let secret = (tokenType === 'refresh') ? 
        process.env.JWT_REFRESH_TOKEN_SECRET : 
        process.env.JWT_ACCESS_TOKEN_SECRET
        // verify JWT token with secret
        const verified = jwt.verify(token, secret)
        // check if userId passed into function matches the UserId in verified token

        if(userId !== verified.userId){
            throw new Error(`Token doesn't match user: ${JSON.stringify(userId)}`)
        }
        return verified
    }
    catch(e){
        throw new Error(`Invalid Token: ${e}`)
    }
}

module.exports = {
    genAccessToken,
    genRefreshToken,
    verifyJWT
}