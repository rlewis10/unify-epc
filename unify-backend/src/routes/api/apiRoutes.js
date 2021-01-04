const express = require('express')
const router = express.Router()


const userRoutes = require('./userRoutes')
const destRoutes = require('./destroutes')

router.use('/user', userRoutes)
router.use('/dest', destRoutes)

module.exports = router