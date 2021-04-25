const User = require('../../schema/db/UserSchema')

// find a user Id by username, returns the document Id
const findUserId = async (user) => {
    return await User.findOne({
        username: user })
}

//get user from a userId
const getUserObj = async (id) => {
    return await User.findById(id).lean()
}

// create a new user, returns the inserted document
const createUser = async (data) => {
    const user = new User(data)
    return await user.save()
}

// update a user by Id, returns the inserted document
const updateUserbyId = async (id, data) => {
    let updatedUser = await User.findOneAndUpdate({_id: id}, data)
    return updatedUser 
}

module.exports = {
    createUser,
    updateUserbyId,
    findUserId,
    getUserObj
}