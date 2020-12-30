const fs = require('fs')
const sf = require('jsforce')

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

const sfAuth = async () => {
    const keys = await read('./cred/salesforce-creds.json')
    return new Promise((resolve, reject) => {
        try {
            let conn = new sf.Connection({
                oauth2: {
                    loginUrl: keys.loginUrl,
                    clientId: keys.clientId,
                    clientSecret: keys.clientSecret
                }
            })
            conn.login(keys.username, keys.password.concat(keys.securitytoken),(err, UserInfo) => {
                resolve(conn)
            })
        }
        catch (err) {
            reject(`Unable to get token from Salesforce, Error: ${err}`)
        }
    })
}

const read = async (file) => {
    const getFile = await fs.promises.readFile(file)
        .catch(err => {console.log(`Error reading from file: ${err}`)})
    return JSON.parse(getFile)
}

const write = async (file, path) => {
    let data = await file
    fs.promises.writeFile(path, JSON.stringify(data, undefined, 2))
        .catch(err => {console.error(`Error writing to file: ${err}`)})
    return path
}

module.exports = {
    get : sfAuth
}