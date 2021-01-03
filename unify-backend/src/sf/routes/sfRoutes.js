const express = require('express')
const router = express.Router()
const contactRoutes = require('../routes/sfRoutesContact')
const locationsRoutes = require('../routes/sfRoutesLocations.js')

router.use('/contact', contactRoutes)
router.use('/locations', locationsRoutes)

module.exports = router