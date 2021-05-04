const User = require('../../schema/db/UserSchema')

// find a user Id by username, returns the document Id
const findUserId = async (user) => {
    return await User.findOne({
        username: user })
}

//get user from a userId
const getUserObj = async (id) => {
    return await User.findById(id)
}

// create a new user, returns the inserted document
const saveUser = async (data) => {
    const user = new User(data)
    return await user.save()
}

// update a user by Id, returns the inserted document
const upsertUser = async (id, data) => {
    try{
        const find = {_id: id}
        const update = data
        const options = {
            new: true, // Always returning updated work experiences.
            upsert: true, // By setting this true, it will create if it doesn't exist
            projection: { _id: 0, __v: 0 }, // without return _id and __v
          }
    
        let updatedDest = await User.findOneAndUpdate(find, update, options).lean()
        return updatedDest 
    }
    catch(e){
        throw new Error(`Unable to create user in DB: ${JSON.stringify(e)}`)
    }
}

module.exports = {
    saveUser,
    upsertUser,
    findUserId,
    getUserObj
}