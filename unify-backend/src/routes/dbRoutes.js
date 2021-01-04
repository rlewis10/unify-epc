const express = require('express')
const router = express.Router()
const {dbConn} = require('../methods/db/dbMethodsConn')
const dbUser = require('../methods/db/dbMethodsUser')
const dbDest = require('../methods/db/dbMethodsDest')
const sf = require('../methods/sf/sfMethods')

// initialise the database connection 
dbConn()

// find a user by username
router.get('/find/username/:username', async (req, res) => {
    try{
        let user = await dbUser.findUserId(req.params.username)
        res.send(user)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

//create a new user
router.post('/create', async (req, res) => {
    try{
        let savedUserDb = await dbUser.createUser(req.body) 
        let savedContactSf = await sf.createContact(savedUserDb)
        let updatedSFId = await db.updateUserbyId(savedUserDb.id, {sfid: savedContactSf.id})
        res.send(savedUserDb)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})


// update a user
router.post('/update/id/:id', async (req, res) => {
    try{
        let updatedUser = await dbUser.updateUserbyId(req.params.id, req.body)
        res.send(updatedUser)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

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