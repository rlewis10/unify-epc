const express = require('express')
const router = express.Router()
const token = require('../../methods/auth/token')
const auth = require('../../methods/auth/authValidation')
const dbUser = require('../../methods/db/dbUserMethods')
const sf = require('../../methods/sf/sfUserMethods')

// when a user signups check if existing user, generate access & refresh token
router.post('/signup', async (req, res) => {
  try{
    const {password, ...user} = req.body
    const newUser = await auth.signup(user, password)
    res.status(200).json(newUser)
  }
  catch(e){
    res.status(400).send(e.message)  
  }
})

// when a user logs in check existing user password, generate access & refresh token
router.post('/login', async (req, res) => {
  try{
    const {username, password} = req.body
    const userLogin = await auth.login(username, password)
    res.status(200).json(userLogin)
  }
  catch(e){
    res.status(400).send(e.message)  
  }
})

// route for checking that the token is valid for protected routes
router.get('/verifytoken', token.verifyAccessToken, async (req, res, next) => {
  //let accessToken = await token.verifyJWTToken()
  //res.header('accessToken',accessToken).send({isAuthenticed: true})
  res.send(res.auth)
})

// route for renewing the access token with the resfresh token
router.post('/renewtoken/userid/:id', async (req, res) => {
  try{
    const foundUser = req.params.id
    const refreshToken = req.body.refreshToken
    const newAccessToken = await token.refreshAccessToken(foundUser, refreshToken)
    res.status(200).json({ accessToken: newAccessToken })
  }
  catch(e){
    res.status(400).send(e.message)
  }
})

module.exports = router