const express = require('express')
const router = express.Router()
const token = require('../../methods/auth/token')
const auth = require('../../methods/auth/authValidation')
const dbUser = require('../../methods/db/dbUserMethods')

// temp route for generating access & refresh token
router.get('/gettoken', async (req, res) => {
    const accessToken =  token.genAccessToken()
    const refreshToken =  token.genRefreshToken()
    
    res.status(200).json({ accessToken, refreshToken })
})

// temp route for checking that the token is valid for protected routes
router.get('/verifytoken', token.verifyToken, async (req, res, next) => {
    //let accessToken = await token.verifyJWTToken()
    //res.header('accessToken',accessToken).send({isAuthenticed: true})
    res.send(res.auth)
})

// route for renewing the access token with the resfresh token. send
router.post('/renewtoken/userid/:id', async (req, res) => {
    const userData = await User.findById(req.params.id)
    const refreshToken = req.refreshToken
    const newAccessToken = token.refreshAccessToken(userData, refreshToken)

    res.status(200).json({ newAccessToken })
})

// when a a user logs in generate access & refresh token
router.post('/login', async (req, res) => {
  const [username, password, account] = req.body
  const foundUser = await dbUser.findUserId(username)
  const isPasswordCorrect = await auth.checkPassword(foundUser, password)
  if (!foundUser || !isPasswordCorrect) {
    res.status(400).send('incorrect username or password')
  }
  const accessToken = token.genAccessToken(foundUser)
  const refreshToken =  token.genRefreshToken()
  res.status(200).json({ accessToken, refreshToken })
})

module.exports = router