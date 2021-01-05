const express = require('express')
const router = express.Router()
const dbDest = require('../../methods/db/dbDestMethods')
const dbUser = require('../../methods/db/dbUserMethods')
const sfUser = require('../../methods/sf/sfUserMethods')
const sfDest = require('../../methods/sf/sfDestMethods')

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
        await sfUser.upsertContact(userId, savedDestinations.id)
        //create new map_locations in SF
        await sfDest.createMapLoc(req.body)
        //create new destinations in SF
        await sfDest.upsertDest(userId, req.body)

        res.send({success : true})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// update destination list
router.post('/update/destid/:destid/userid/:userid', async (req, res) => {
    try{
        let destId = req.params.destid
        let userId = req.params.userid
        // save over the destination list
        await dbDest.updateDest(destId, req.body)
        // upsert map locations
        await sfDest.createMapLoc(req.body)
        // upsert destinations, creating new ones or updating existing
        await sfDest.upsertDest(userId, req.body)

        res.send({success: true})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// deactivate destinations endpoint, by sending in a list of removed destinations
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