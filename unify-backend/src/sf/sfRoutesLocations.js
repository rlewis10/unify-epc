const express = require('express')
const locationRouter = express.Router()
const sf = require('./sfMethods')

// create map location
locationRouter.post('/create', async (req, res) => {
    try{
        let savedLocations = await sf.createMapLocations(req.body)
        res.send(savedLocations)
    }
    catch(e){
        res.status(400).send(e)
    }
})

locationRouter.get('/get', async (req, res) => {
    try{
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = locationRouter