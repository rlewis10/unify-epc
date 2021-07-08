const express = require('express')
const router = express.Router()

const userRoutes = require('./userRoutes')
const tripRoutes = require('./tripRoutes')

router.use('/user', userRoutes) // user based routes
router.use('/trip', tripRoutes) // trip based routes

module.exports = router