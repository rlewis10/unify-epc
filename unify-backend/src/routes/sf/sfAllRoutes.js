const express = require('express')
const router = express.Router()


const sfContactRoutes = require('./sfContactRoutes')
const sfLocationsRoutes = require('./sfDestRoutes.js')

router.use('/contact', sfContactRoutes)
router.use('/locations', sfLocationsRoutes)

module.exports = router