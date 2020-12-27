const express = require('express')
const { body, validationResult } =  require('express-validator')
const sf = require('./sfMethods')
const token = require('./userAuth')

const app = express()

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${app.get('port')}`);
})

app.use(express.urlencoded({
    extended: true
}))

app.get('/api/getcontact/account/:accountId/email/:conEmail', async (req, res) => {
  let getContact = await sf.getContact(req.params)
  res.send(getContact)
})

app.post('/api/createcontact', async (req, res) => {
  let createContact = await sf.createContact(req.body)
  res.send(createContact)
})

app.post('/api/updatecontact/sfid/:id', async (req, res) => {
  let updateContact = await sf.updateContact(req.params.id, req.body)
  res.send(updateContact)
})

app.get('/api/token', async (req, res) => {
  let accessToken = await token.genAccessToken()
  res.status(200).json({ accessToken })
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

/*
const run = async (data) => {
  let output = await sf.checkContactDups()
  console.log(output)
}

run()
*/
