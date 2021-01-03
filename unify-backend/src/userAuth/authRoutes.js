const express = require('express')
const router = express.Router()
const token = require('./jwt')

router.get('/token', async (req, res) => {
    let accessToken = await token.genAccessToken()
    res.header('accessToken',accessToken).send(accessToken)
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