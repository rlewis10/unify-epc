const express = require('express')
const router = express.Router()
const contactRoutes = require('./sfRoutesContact')

router.use('/contact', contactRoutes)

module.exports = router