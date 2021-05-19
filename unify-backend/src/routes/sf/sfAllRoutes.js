const express = require('express')
const router = express.Router()


const sfContactRoutes = require('./sfContactRoutes')
const sfTripRoutes = require('./sfTripRoutes.js')

router.use('/contact', sfContactRoutes)
router.use('/trip', sfTripRoutes)

module.exports = router