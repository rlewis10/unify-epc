const express = require('express')
const contactRouter = express.Router()
const sfUser = require('../../methods/sf/sfUserMethods')

// find a contact based 
contactRouter.get('/find/account/:accountId/email/:conEmail', async (req, res) => {
    try{
        let findContact = await sfUser.findContact(req.params)
        res.send(findContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

contactRouter.get('/get/unifyid/:id', async (req, res) => {
    try{
        let getContact = await sfUser.getContact(req.params.id)
        res.send(getContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

contactRouter.post('/create', async (req, res) => {
    try{
        let createContact = await sfUser.createContact(req.body)
        res.send(createContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

contactRouter.post('/upsert/id/:id', async (req, res) => {
    try{
        let updatedContact = await sfUser.upsertContact(req.params.id, req.body)
        res.send(updatedContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

module.exports = contactRouter