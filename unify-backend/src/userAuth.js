const jwt = require('jsonwebtoken')

const genAccessToken = async () => {
    let privateKey = 'ssssshhhhhh'
    let payload = {
        userId : 'richard@rlewis.me',
        accountId: '1'
    }
    let token = await jwt.sign(payload, privateKey, {
        algorithm: 'HS256', 
        expiresIn: '1h'
    })
    return token
}

module.exports = {
    genAccessToken : genAccessToken
}