const express = require('express')
const contactRouter = express.Router()
const sf = require('./sfMethods')

contactRouter.get('/find/account/:accountId/email/:conEmail', async (req, res) => {
    try{
        let findContact = await sf.findContact(req.params)
        res.send(findContact)
    }
    catch(e){
        res.status(400).send(e)
    }
})

contactRouter.get('/contact/get/id/:id', async (req, res) => {
    try{
        let getContact = await sf.getContact(req.params)
        res.send(getContact)
    }
    catch(e){
        res.status(400).send(e)
    }
})

contactRouter.post('/contact/create', async (req, res) => {
    try{
        let createContact = await sf.createContact(req.body)
        res.send(createContact)
    }
    catch(e){
        res.status(400).send(e)
    }
})

contactRouter.post('/contact/update/id/:id', async (req, res) => {
    try{
        let updateContact = await sf.updateContact(req.params.id, req.body)
        res.send(updateContact)
    }
    catch(e){
        res.status(400).send(e)
    }
})

module.exports = contactRouter