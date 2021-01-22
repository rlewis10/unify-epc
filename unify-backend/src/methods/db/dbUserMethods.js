const User = require('../../dbSchema/UserSchema')

// find a user Id by username, returns the document Id
const findUserId = async (username) => {
    let docs = await User.findOne({
        username: { $eq: username }
      })
    return docs
}

//get user from a userId
const getUserObj = async (id) => {
    return await User.findById(id)
}

// create a new user, returns the inserted document
const createUser = async (data) => {
    const user = new User({
        accountId : data.accountId,
        firstName: data.firstName,
        LastName: data.lastName,
        email: data.email,
        username : data.username,
        password : data.password
    })
    return await user.save()
}

// update a user by Id, returns the inserted document
const updateUserbyId = async (id, data) => {
    let updatedUser = await User.findOneAndUpdate({_id: id}, data)
    return updatedUser 
}

//get destination objectId from a userId
const getDestId = async (id) => {
    let docs = await User.findById(id)
    return docs.destinations
}

module.exports = {
    createUser,
    updateUserbyId,
    findUserId,
    getDestId,
    getUserObj
}