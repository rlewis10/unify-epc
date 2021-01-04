const express = require('express')
const contactRouter = express.Router()
const sf = require('../../methods/sf/sfMethods')

contactRouter.get('/find/account/:accountId/email/:conEmail', async (req, res) => {
    try{
        let findContact = await sf.findContact(req.params)
        res.send(findContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

contactRouter.get('/get/unifyid/:id', async (req, res) => {
    try{
        let getContact = await sf.getContact(req.params.id)
        res.send(getContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

contactRouter.post('/create', async (req, res) => {
    try{
        let createContact = await sf.createContact(req.body)
        res.send(createContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

contactRouter.post('/upsert/id/:id', async (req, res) => {
    try{
        let updatedContact = await sf.upsertContact(req.params.id, req.body)
        res.send(updatedContact)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

module.exports = contactRouter