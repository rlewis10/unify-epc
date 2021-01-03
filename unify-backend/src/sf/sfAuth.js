const sf = require('jsforce')

// setup environement variables
require('dotenv').config({path: __dirname + '../.env'})

const loginURL = process.env.SF_LOGIN_URL
const clientId = process.env.SF_CLIENT_ID
const clientSecret = process.env.SF_CLIENT_SECRET
const username = process.env.SF_USERNAME
const password = process.env.SF_PASSWORD
const securityToken = process.env.SF_SECUIRTY_TOKEN

const sfAuth = async () => {
    return new Promise((resolve, reject) => {
        try {
            let conn = new sf.Connection({
                oauth2: {
                    loginUrl: loginURL,
                    clientId: clientId,
                    clientSecret: clientSecret
                }
            })

            conn.login(username, password.concat(securityToken),(err, userInfo) => {
            if (err) { reject(err)}
            resolve(conn)
            console.log(`connected to SF: ${JSON.stringify(userInfo)}`)
            })
        }
        catch (err) {
            reject(`Unable to get token from Salesforce, Error: ${err}`)
        }
    })
}

module.exports = {
    get : sfAuth
}