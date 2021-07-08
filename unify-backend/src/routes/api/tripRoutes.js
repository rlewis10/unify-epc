const express = require('express')
const router = express.Router()
const dbTrip = require('../../methods/db/dbTripMethods')
const sfTrip = require('../../methods/sf/sfTripMethods')

// find trips by userId in DB
router.get('/find/userid/:id', async (req, res) => {
    try{
        const userId = req.params.id
        const userDests = await dbTrip.getTripsByUserId(userId)
        res.send(userDests)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// upsert new trips
router.post('/upsert/userid/:id', async (req, res) => {
    try{
        const userId = req.params.id
        const dests = req.body
        // db trips
        const oldDests = await dbTrip.getTripsByUserId(userId) // get user trips
        await dbTrip.upsertTripsByUserId(userId, dests) // create trips in db

        // sf trips
        await sfTrip.createMapLoc(dests) // create new map_locations in SF
        await sfTrip.upsertTrip(userId, oldDests, dests) // create new trips in SF
        
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