const sf = require('jsforce')

// setup environement variables
require('dotenv').config({path: __dirname + '../.env'})

const sfAuth = () => {
    return new Promise((resolve, reject) => {
            console.log(`connecting to Salesforce`)
            let conn = new sf.Connection({
                oauth2: {
                    loginUrl: process.env.SF_LOGIN_URL,
                    clientId: process.env.SF_CLIENT_ID,
                    clientSecret: process.env.SF_CLIENT_SECRET
                }
            })
            conn.login(
                process.env.SF_USERNAME, 
                process.env.SF_PASSWORD.concat(process.env.SF_SECURITY_TOKEN),(err, userInfo) => {
                    if (err) {
                        console.log((`Unable to get connect to Salesforce, Error: ${err}`))
                        reject(err)
                    }
                    else{
                        console.log(`Connected to Salesforce ${userInfo}`)
                        resolve(conn)
                    }
                }
            )
    })
}

module.exports = {
    get : sfAuth
}