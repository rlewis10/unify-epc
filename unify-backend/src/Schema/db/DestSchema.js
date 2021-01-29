const db = require('mongoose')

const destSchema = new db.Schema(
    {
        destId : {
            type: String,
            required: true,
            max: 255
        },
        sfDestId : {
            type: String,
            unique: true,
            max: 18,
            min: 18
        },
        placeLabel: {
            type: String,
            required: true,
            max: 255
        },
        url: {
            type: String,
            required: true,
            max: 255
        },
        city:  {
            type: String,
            required: true,
            max: 255
        },
        country: {
            type: String,
            required: true,
            max: 255
        },
        position: {
            type: Object,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    })

module.exports = db.model('Dest', destSchema)