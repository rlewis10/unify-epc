const express = require('express')
const router = express.Router()
const {dbConn} = require('../methods/dbConnMethods')
const dbUser = require('../methods/dbUserMethods')
const dbDest = require('../methods/dbDestMethods')

// initialise the database connection 
dbConn()

//create a new user
router.post('/create', async (req, res) => {
    try{
        let savedUser = await dbUser.createUser(req.body)
        res.send(savedUser)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// find a user by username, returning document Id
router.get('/find/username/:username', async (req, res) => {
    try{
        let _id = await dbUser.findUserId(req.params.username)
        res.send(_id)
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