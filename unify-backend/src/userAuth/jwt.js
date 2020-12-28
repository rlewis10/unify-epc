const jwt = require('jsonwebtoken')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

// create and assign a token
const genAccessToken = async () => {
    let payload = {
        userId : 'richard@rlewis.me',
        accountId: '1'
    }
    let token = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        algorithm: 'HS256', 
        expiresIn: '1h'
    })
    return token
}

// verify JWT token
const verifyJWTToken = async (req, res, next) => {
    const authHeaderToken = req.header('accessToken')
    if(!authHeaderToken) return res.status(401).send('Invalid token')

    try{
        const verified = await jwt.verify(authHeaderToken, process.env.JWT_ACCESS_SECRET)
        req.user = verified
        next()
    }
    catch(e){
        res.status(403).send(`Unauthorized: ${e}`)
    }
}

module.exports = {
    genAccessToken : genAccessToken,
    verifyJWTToken : verifyJWTToken
}