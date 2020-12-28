require('dotenv').config()
const jwt = require('jsonwebtoken')

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
const verifyJWTToken = (req, res, next) => {
    const authHeaderToken = req.header('accessToken')
    if(!authHeaderToken) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(authHeaderToken, process.env.JWT_ACCESS_SECRET)
        req.user = verified
        next()
    }
    catch(e){
        res.status(403).send('Invalid Token')
    }
}

module.exports = {
    genAccessToken : genAccessToken,
    verifyJWTToken : verifyJWTToken
}