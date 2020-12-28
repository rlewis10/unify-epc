const express = require('express')
const router = express.Router()
const db = require('./dbMethods')

db.dbCon()

router.post('/create', async (req, res) => {
    try{
        let savedUser = await db.createUser(req.body)
        res.send(savedUser)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = router