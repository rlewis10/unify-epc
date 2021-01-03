const User = require('../schema/UserSchema')

// find a user Id by username, returns the document Id
const findUserId = async (username) => {
    docs = await User.findOne({
        username: { $eq: username }
      })
    return docs._id
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
    docs = await User.findById(id)
    return docs.destinations
}

module.exports = {
    createUser,
    updateUserbyId,
    findUserId,
    getDestId
}