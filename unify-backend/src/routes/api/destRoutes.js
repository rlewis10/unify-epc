const express = require('express')
const router = express.Router()
const dbDest = require('../../methods/db/dbDestMethods')
const sfDest = require('../../methods/sf/sfDestMethods')

// find destinations by userId
router.get('/find/userid/:id', async (req, res) => {
    try{
        let userDests = await dbDest.getDestsByUserId(req.params.id)
        res.send(userDests)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// upsert new destinations
router.post('/upsert/userid/:id', async (req, res) => {
    try{
        const userId = req.params.id
        const dests = req.body
        const oldDests = await dbDest.getDestsByUserId(userId) // get user destinations
        await dbDest.upsertDestsByUserId(userId, dests) // create destinations in db
        await sfDest.createMapLoc(dests) // create new map_locations in SF
        await sfDest.upsertDest(userId, oldDests, dests) // create new destinations in SF
        
        res.send({success : true})
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