const db = require('mongoose')

const userSchema = new db.Schema(
    {
        accountId : {
            type: String,
            required: true,
            max: 255
        },
        sfContactId: {
            type: String
        },
        hashPassword : {
            type: String,
            required: true,
            max: 1024,
            min: 6
        },
        firstName : {
            type: String,
            required: true,
            max: 255
        },
        lastName : {
            type: String,
            required: true,
            max: 255
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 255
        },
        createdDate : {
            type: Date
        },
        lastUpdatedDate : {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true
        },
        trips: {
            type: db.Schema.Types.Array
        },
        alerts: {
            type: Object
        },
        budget: {
            type: Object
        }
    })

module.exports = db.model('User', userSchema)