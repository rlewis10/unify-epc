const db = require('mongoose')

const userSchema = new db.Schema(
    {
        accountId : {
            type: String,
            required: true,
            max: 255
        },
        username : {
            type: String,
            required: true,
            max: 255,
            min: 6
        },
        password : {
            type: String,
            required: true,
            max: 1024,
            min: 6
        },
        sfContactId : {
            type: String,
            max: 18,
            min: 18
        },
        date: {
            type: Date,
            default: Date.now
        }
    })

module.exports = db.model('User', userSchema)