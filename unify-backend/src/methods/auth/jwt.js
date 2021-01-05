const jwt = require('jsonwebtoken')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

// create and assign a token
const genJWTToken = () => {
    let payload = {
        userId : 'richard@rlewis.me',
        accountId: '1'
    }
    let token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
        algorithm: 'HS256', 
        expiresIn: '1h'
    })
    return token
}

// verify JWT token
const verifyJWTToken = (req, res, next) => {
    const bearerHeader = req.header('accessToken')
    if(!bearerHeader) return res.status(401).send('Invalid token')
    const bearerToken = bearerHeader.split(' ')[1]
    
    try{
        const verified = jwt.verify(bearerToken, process.env.JWT_TOKEN_SECRET)
        req.auth = verified
        next()
    }
    catch(e){
        res.status(403).send(`Unauthorized: ${e}`)
    }
}

module.exports = {
    genJWTToken,
    verifyJWTToken
}