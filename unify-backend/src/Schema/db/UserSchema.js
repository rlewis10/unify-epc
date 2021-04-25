const db = require('mongoose')

const userSchema = new db.Schema(
    {
        accountId : {
            type: String,
            required: true,
            default: '1',
            max: 255
        },
        username : {
            type: String,
            required: true,
            unique: true,
            max: 255,
            min: 6
        },
        hashPassword : {
            type: String,
            required: true,
            max: 1024,
            min: 6
        },
        sfContactId : {
            type: String,
            unique: true,
            max: 18,
            min: 18
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
            max: 255
        },
        dob: {
            type: Date
        },
        createdDate : {
            type: Date,
            default: Date.now
        },
        lastUpdatedDate : {
            type: Date
        },
        isActive: {
            type: Boolean,
            default: true
        },
        destinations: {
            type: db.Schema.Types.Array
        },
        travelDates: {
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