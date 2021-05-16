const express = require('express')
const router = express.Router()
const auth = require('../../methods/auth/authValidation')

// when a user signups check if existing user, generate access & refresh token
router.post('/signup', async (req, res) => {
  try{
    const {password, ...user} = req.body
    const newUser = await auth.signup(user, password)
    newUser.isAuthenticated
      ? res.status(200).json(newUser)
      : res.status(401).json(newUser)
  }
  catch(e){
    res.status(401).send({
      isAuthenticated: false,
      error: e.message
    })  
  }
})

// when a user logs in check existing user password, generate access & refresh token
router.post('/login', async (req, res) => {
  try{
    const {email, password} = req.body
    const userLogin = await auth.login(email, password)
    userLogin.isAuthenticated
    ? res.status(200).json(userLogin)
    : res.status(401).json(userLogin)
  }
  catch(e){
    res.status(401).send({
      isAuthenticated: false,
      error: e.message
    })  
  }
})

// route for checking that the token is valid for protected routes
router.get('/verifytoken/', auth.verifyAccessToken, async (req, res, next) => {
  res.status(200).json({ isAuthenticated: true })
})

// route for renewing the access token with the resfresh token
router.post('/renewtoken/', async (req, res) => {
  try{
    const refreshToken = req.body.refreshToken
    // send error if no accessToken is sent
    if(!refreshToken) return res.status(401).send({isAuthenticated: false})
    const userId = req.body.userId
    // send error if no userId is sent
    if(!userId) return res.status(401).send({isAuthenticated: false})
    const newAccessToken = await auth.refreshAccessToken(userId, refreshToken)
    res.status(200).json({ accessToken: newAccessToken, isAuthenticated: true })
  }
  catch(e){
    res.status(401).send({
      isAuthenticated: false,
      error: e.message
    })
  }
})

module.exports = router