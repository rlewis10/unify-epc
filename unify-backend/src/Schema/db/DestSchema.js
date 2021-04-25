const db = require('mongoose')

const destSchema = new db.Schema(
    {
        destId : {
            type: String,
            required: true,
            unique: true,
            max: 255
        },
        sfDestId : {
            type: String,
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
        }
    })

module.exports = db.model('Dest', destSchema)