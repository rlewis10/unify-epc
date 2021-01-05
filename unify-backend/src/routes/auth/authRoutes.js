const express = require('express')
const router = express.Router()
const token = require('../../methods/auth/jwt')

router.get('/token', async (req, res) => {
    let accessToken = await token.genJWTToken()
    res.header('accessToken',accessToken).send(accessToken)
})

router.get('/verify', token.verifyJWTToken, async (req, res, next) => {
    //let accessToken = await token.verifyJWTToken()
    //res.header('accessToken',accessToken).send({isAuthenticed: true})
    res.send(req.auth)
})


// app.post('/login', async (req, res) => {
//   const [username, password, account] = req.body
//   const foundUser = await findUser(username, account)
//   if (!foundUser) {
//     res.status(400).send('user not found')
//   }
//   const isPasswordCorrect = checkPassword(foundUser, password)
//   if (!isPasswordCorrect) {
//     res.status(400).send('incorrect password')
//   }
//   const accessToken = genAccessToken(foundUser)
//   res.status(200).json({ genAccessToken })
// })

module.exports = router