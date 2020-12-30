const express = require('express')
const locationRouter = express.Router()
const sf = require('./sfMethods')

// create map_location endpoint
locationRouter.post('/create', async (req, res) => {
    try{
        let savedLocations = await sf.createMapLocations(req.body)
        res.send(savedLocations)
    }
    catch(e){
        res.status(400).send(e)
    }
})

// create destination endpoint
locationRouter.post('/dest/contactid/:id', async (req, res) => {
    try{
        let savedDestinations = await sf.createDestinations(req.params.id, req.body)
        res.send(savedDestinations)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = locationRouter