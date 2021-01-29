const express = require('express')
const router = express.Router()
const token = require('../../methods/auth/token')
const auth = require('../../methods/auth/authValidation')
const dbUser = require('../../methods/db/dbUserMethods')
const sf = require('../../methods/sf/sfUserMethods')

// when a user signups check if existing user, generate access & refresh token
router.post('/signup', async (req, res) => {
  try{
    const user = req.body
    const foundUser = await dbUser.findUserId(user.username)

    if (foundUser) {
      throw new Error(`User already exists`)
    }
    user[hashPassword] = auth.hashPassword(user.password)
    const savedUserDb = await dbUser.createUser(user) 
    //const savedContactSf = await sf.createContact(savedUserDb)
    //const updatedSFId = await dbUser.updateUserbyId(savedUserDb.id, {sfid: savedContactSf.id})

    res.status(200).json({
      accessToken : token.genAccessToken(foundUser.id, foundUser.username), 
      refreshToken : token.genRefreshToken(foundUser.id, foundUser.username)
    })
  }
  catch(e){
    res.status(400).send(e.message)  
  }
})

// when a user logs in check existing user password, generate access & refresh token
router.post('/login', async (req, res) => {
  try{
    const {username, password} = req.body
    const foundUser = await dbUser.findUserId(username)
    const isPasswordCorrect = await auth.checkPassword(foundUser.hashPassword, password)
    if (!foundUser || !isPasswordCorrect) {
      throw new Error(`Incorrect username or password`)
    }
    res.status(200).json({
      accessToken : token.genAccessToken(foundUser.id, foundUser.username), 
      refreshToken : token.genRefreshToken(foundUser.id, foundUser.username)
    })
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

// route for renewing the access token with the resfresh token. send
router.post('/renewtoken/userid/:id', async (req, res) => {
  try{
    const foundUser = await dbUser.findUserId(req.params.id)
    const refreshToken = req.body.refreshToken
    const newAccessToken = await token.refreshAccessToken(foundUser, refreshToken)
    res.status(200).json({ accessToken: newAccessToken })
  }
  catch(e){
    res.status(400).send(e.message)
  }
})

module.exports = router