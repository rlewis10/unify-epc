const express = require('express')
const { regUser } = require('./dbMethods')
const router = express.Router()

const dbMethods = require('./dbMethods')

dbMethods.dbCon()

router.post('/create', async (req, res) => {
    try{
        const savedUser = await createUser(req.body)
        res.send(savedUser)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = router