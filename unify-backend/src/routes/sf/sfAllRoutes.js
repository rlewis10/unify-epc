const express = require('express')
const router = express.Router()


const sfContactRoutes = require('./sfRoutesContact')
const sfLocationsRoutes = require('./sfRoutesLocations.js')

router.use('/contact', sfContactRoutes)
router.use('/locations', sfLocationsRoutes)

module.exports = router