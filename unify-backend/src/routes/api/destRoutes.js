const express = require('express')
const router = express.Router()
const dbDest = require('../../methods/db/dbDestMethods')
const dbUser = require('../../methods/db/dbUserMethods')
const sf = require('../../methods/sf/sfMethods')

// find destinations by id
router.get('/find/id/:id', async (req, res) => {
    try{
        let dest = await dbDest.getDestObj(req.params.id)
        res.send(dest)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// create new destinations
router.post('/create', async (req, res) => {
    try{
        let savedDestinations = await dbDest.createDest(req.body)
        // get dest id and add it to user document
        res.send(savedDestinations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// deactivate destinations endpoint
router.post('/deactivate/id/:id', async (req, res) => {
    try{
        let deactivateDestinations = await sf.deactivateDest(req.params.id, req.body)
        res.send(deactivateDestinations)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})



module.exports = router