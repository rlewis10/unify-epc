const express = require('express')
const router = express.Router()
const dbDest = require('../methods/db/dbDestMethods')
const sf = require('../methods/sf/sfMethods')

// get destination id
router.get('/find/destid/id/:id', async (req, res) => {
    try{
        let destId = await dbUser.getDestId(req.params.id)
        res.send(destId)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

module.exports = router