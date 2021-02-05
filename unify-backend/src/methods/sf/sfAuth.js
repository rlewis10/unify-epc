const sf = require('jsforce')

// setup environement variables
require('dotenv').config({path: __dirname + '../.env'})

let sfTokens = {}

const oauth2 = {
    loginUrl : process.env.SF_LOGIN_URL,
    clientId : process.env.SF_CLIENT_ID,
    clientSecret : process.env.SF_CLIENT_SECRET
}

// temp setup, redo later
const tokenFlow = {
    instanceUrl : 'https://eu28.salesforce.com',
    accessToken : '00D24000000HICR!AQkAQEUOoti_j6pQFb_8IN6zV4rIKfK1K4L3Y6_qeHaGiiDlmx3NIrYkAHaYk8tYpxglsYE0wxShph0IZ0BDP0Qo.GNfJMuw'
}

const sfAuth = () => {
    return new Promise((resolve, reject) => {
        console.log(`connecting to Salesforce`)
        conn = new sf.Connection({oauth2})
        conn.login(
            process.env.SF_USERNAME, 
            process.env.SF_PASSWORD.concat(process.env.SF_SECURITY_TOKEN),(err, userInfo) => {
                if (err) {
                    console.log((`Unable to get connect to Salesforce, Error: ${err}`))
                    reject(err)
                }
                else{
                    sfTokens['userInfo'] = conn.userInfo
                    sfTokens['accessToken'] = conn.accessToken
                    sfTokens['refreshToken'] = conn.refreshToken

                    console.log(`Connected to Salesforce ${userInfo}`)
                    resolve(conn)
                }
            }
        )
    })
}

module.exports = {
    get : sfAuth,
    tokens : sfTokens
    
}