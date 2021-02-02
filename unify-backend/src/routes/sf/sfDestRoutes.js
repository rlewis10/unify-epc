const express = require('express')
const router = express.Router()
const sfDest = require('../../methods/sf/sfDestMethods')

// create map_locations endpoint
router.post('/create', async (req, res) => {
    try{
        let savedLocations = await sfDest.createMapLoc(req.body)
        res.send(savedLocations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// create destinations endpoint
router.post('/dest/create/contactid/:id', async (req, res) => {
    try{
        let savedDestinations = await sfDest.upsertDest(req.params.id, req.body)
        res.send(savedDestinations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// deactivate destinations endpoint
router.post('/dest/deactivate/contactid/:id', async (req, res) => {
    try{
        let deactivateDestinations = await sfDest.deactivateDest(req.params.id, req.body)
        res.send(deactivateDestinations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})



module.exports = router