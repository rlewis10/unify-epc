const express = require('express')
const router = express.Router()
const dbUser = require('../../methods/db/dbUserMethods')
const sf = require('../../methods/sf/sfUserMethods')

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
        let updatedSFId = await dbUser.updateUserbyId(savedUserDb.id, {sfid: savedContactSf.id})
        res.send({success: true})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// update a user
router.post('/update/id/:id', async (req, res) => {
    try{
        let updatedUserDb = await dbUser.updateUserbyId(req.params.id, req.body)
        let updateContactSf = await sf.updateUserbyId(updatedUserDb.id, updatedUserDb)
        res.send(updatedUserDb)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

module.exports = router