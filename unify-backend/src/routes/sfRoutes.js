const express = require('express')
const router = express.Router()
const contactRoutes = require('./sfRoutesContact')
const locationsRoutes = require('./sfRoutesLocations.js')

router.use('/contact', contactRoutes)
router.use('/locations', locationsRoutes)

module.exports = router