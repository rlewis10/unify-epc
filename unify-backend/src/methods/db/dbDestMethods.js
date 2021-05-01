const Dest = require('../../Schema/db/DestSchema')
const dbUser = require('../../methods/db/dbUserMethods')

// find destinations list from user id
const getDestsByUserId = async (id) => {
    try{
        // get user destination Ids from user object 
        let user = await dbUser.getUserObj(id)
        let destIds = user.destinations

        // cycle through dest object Ids and get dest data
        return destIds.reduce(async (obj, dest) => {
            let destObj = await obj // wait for the prev promise to resolve
            let {destId, ...rest}  = await getDestsByObjId(dest.Id) // destruct the destId from rest of dest data
            return {...destObj, [destId] : {...rest, ...dest}} // use spread operator to add new item to object without overwritting old object
        },{})
    }
    catch(e){
        throw new Error(`Cannot get user's destinations: ${JSON.stringify(e)}`)
    }
}

// find single destination from dests collection
const getDestsByObjId = async (id) => {
    try{
        const options = {
            projection: { _id: 0, __v: 0 }, // without return _id and __v
          }
        let dests = await Dest.findById(id, options).lean()
        return dests
    }
    catch(e){
        throw new Error(`Unable to return destinations from DB: ${JSON.stringify(e)}`)
    }
}

// create new destinations, returns the inserted document
const createDests = async (userId, dests) => {
    Object.keys(dests).map((d) => {
        dests[d]
      })

    // check if dest exists using destId
    // add to dest collection
    // cycle through dest object and add destId to data and new dests array

    // update user with dests
    // dbUser.updateUserbyId

    // const savedDests = saveDests(data)

}

// create new destinations (array), returns the inserted document
const saveDests = async (data) => {
    try{
        return await Dest.create(data)
    }
    catch(e){
        throw new Error(`Unable to create destinations in DB: ${JSON.stringify(e)}`)
    }
}

// find a destination by destId and update
// update destination list, salesforce handles 'decactivated' destinations by upserting 'isActive' data. 
const upsertDest = async (id, data) => {
    try{
        const find = {destId: id}
        const update = data
        const options = {
            new: true, // Always returning updated work experiences.
            upsert: true,// By setting this true, it will create if it doesn't exist
            projection: { _id: 0, __v: 0 }, // without return _id and __v
          }
    
        let updatedDest = await Dest.findOneAndUpdate(find, update, options).lean()
        return updatedDest 
    }
    catch(e){
        throw new Error(`Unable to create destinations in DB: ${JSON.stringify(e)}`)
    }
}

module.exports = {
    getDestsByObjId,
    getDestsByUserId,
    createDests
}