const db = require('mongoose')

const userSchema = new db.Schema(
    {
        accountId : {
            type: String,
            required: true,
            default: '1',
            max: 255
        },
        sfid : {
            type: String,
            max: 255
        },
        username : {
            type: String,
            required: true,
            unique: true,
            max: 255,
            min: 6
        },
        password : {
            type: String,
            required: true,
            max: 1024,
            min: 6
        },
        refreshToken : {
            type: String,
            unique: true,
            max: 255
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
            type: db.Schema.Types.ObjectId, 
            ref: 'Dest'
        }
    })

module.exports = db.model('User', userSchema)