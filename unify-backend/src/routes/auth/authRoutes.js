const express = require('express')
const router = express.Router()
const token = require('../../methods/auth/token')
const auth = require('../../methods/auth/authValidation')
const dbUser = require('../../methods/db/dbUserMethods')

// when a a user logs in generate access & refresh token
router.post('/login', async (req, res) => {
  try{
    const {username, password} = req.body
    const foundUser = await dbUser.findUserId(username)
    // const isPasswordCorrect = await auth.checkPassword(foundUser, password)
    // if (!foundUser || !isPasswordCorrect) {
    //   throw new Error(`Incorrect username or password`)
    // }
    const accessToken = token.genAccessToken(foundUser.id, foundUser.username)
    const refreshToken =  token.genRefreshToken(foundUser.id, foundUser.username)
    res.status(200).json({ accessToken, refreshToken })
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

// route for renewing the access token with the resfresh token. send
router.post('/signout', async (req, res) => {

})

module.exports = router