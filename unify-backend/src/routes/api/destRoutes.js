const express = require('express')
const router = express.Router()
const dbDest = require('../../methods/db/dbDestMethods')
const sf = require('../../methods/sf/sfMethods')

// find destinations by id
router.get('/find/destid/id/:id', async (req, res) => {
    try{
        let dest = await dbDest.getDestObj(req.params.id)
        res.send(dest)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// create new destinations

// update destinations
module.exports = router