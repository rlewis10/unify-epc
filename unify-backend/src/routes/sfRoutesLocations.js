const express = require('express')
const locationRouter = express.Router()
const sf = require('../methods/sf/sfMethods')

// create map_locations endpoint
locationRouter.post('/create', async (req, res) => {
    try{
        let savedLocations = await sf.createMapLoc(req.body)
        res.send(savedLocations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// create destinations endpoint
locationRouter.post('/dest/create/contactid/:id', async (req, res) => {
    try{
        let savedDestinations = await sf.createDest(req.params.id, req.body)
        res.send(savedDestinations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// deactivate destinations endpoint
locationRouter.post('/dest/deactivate/contactid/:id', async (req, res) => {
    try{
        let deactivateDestinations = await sf.deactivateDest(req.params.id, req.body)
        res.send(deactivateDestinations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})



module.exports = locationRouter