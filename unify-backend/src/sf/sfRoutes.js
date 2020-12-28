const express = require('express')
const router = express.Router()
const sf = require('./sfMethods')

router.get('/getcontact/account/:accountId/email/:conEmail', async (req, res) => {
    let getContact = await sf.getContact(req.params)
    res.send(getContact)
})
  
router.post('/createcontact', async (req, res) => {
    let createContact = await sf.createContact(req.body)
    res.send(createContact)
})

router.post('/updatecontact/sfid/:id', async (req, res) => {
    let updateContact = await sf.updateContact(req.params.id, req.body)
    res.send(updateContact)
})

module.exports = router