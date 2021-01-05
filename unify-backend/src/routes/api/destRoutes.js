const express = require('express')
const router = express.Router()
const dbDest = require('../../methods/db/dbDestMethods')
const dbUser = require('../../methods/db/dbUserMethods')
const sf = require('../../methods/sf/sfMethods')

// find destinations by id
router.get('/find/destid/:id', async (req, res) => {
    try{
        let dest = await dbDest.getDestObj(req.params.id)
        res.send(dest)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// create new destinations
router.post('/create/userid/:id', async (req, res) => {
    try{
        let userId = req.params.id
        let savedDestinations = await dbDest.createDest(req.body)
        // get dest id and add it to user document
        console.log(savedDestinations.id)
        await sf.upsertContact(userId, savedDestinations.id)

        //create new map_locations in SF
        let savedLocations = await sf.createMapLoc(req.body)
        //create new destinations in SF
        await sf.createDest(userId, )

        res.send({success : true})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// update destination list
router.post('/update/destid/:id', async (req, res) => {
    try{
        
        res.send()
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// deactivate destinations endpoint
router.post('/deactivate/destid/:id', async (req, res) => {
    try{
        let deactivateDestinations = await sf.deactivateDest(req.params.id, req.body)
        res.send(deactivateDestinations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})



module.exports = router