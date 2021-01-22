const jwt = require('jsonwebtoken')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

// create JWT access token with 1hr expiry
const genAccessToken = () => {
    let payload = {
        username: 'richard@rlewis.me',
        accountId: '1',
        type: 'access token'
    }
    let token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256', 
        expiresIn: '1h'
    })
    return token
}

// create JWT refresh token with 1day expiry, used to request a new access token if the access token has expired
const genRefreshToken = () => {
    let payload = {
        username: 'richard@rlewis.me',
        accountId: '1',
        type: 'refresh token'
    }
    let token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d'
    })
    return token
}

// generate new accress token using refresh token
const refreshAccessToken = (userId, refreshToken) => {
    try {
        // send error if no refreshToken is sent
        if(!refreshToken) return res.status(401).send('Invalid token')
        
        //extract payload from refresh token and generate a new access token and send it
        const payload = jwt.verify(bearerToken, process.env.JWT_TOKEN_SECRET)
        const accessToken = genAccessToken()
        return res.status(200).json({ accessToken })   
    }
    catch(e){
        res.status(403).send(`Unauthorized: ${e}`)
    }
}

// verify JWT token
const verifyToken = (req, res, next) => {
    try{
        const bearerHeader = req.header('accessToken')
        // send error if no accessToken is sent
        if(!bearerHeader) return res.status(401).send('Invalid token')
        const bearerToken = bearerHeader.split(' ')[1]

        const verified = jwt.verify(bearerToken, process.env.JWT_TOKEN_SECRET)
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
    verifyToken
}