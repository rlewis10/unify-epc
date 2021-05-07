const Dest = require('../../Schema/db/DestSchema')
const dbUser = require('../../methods/db/dbUserMethods')

// find destinations list from user id
const getDestsByUserId = async (userId) => {
    try{
        // get user destination Ids from user object 
        const user = await dbUser.getUserObj(userId)
        const dests = user.destinations

        // cycle through dest object Ids and get dest data
        return dests.reduce(async (obj, dest) => {
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

// create new destinations in dests collection, returns the inserted document
const upsertDestsByUserId = async (userId, dests) => {
    try{
        // cycle through dests object separating dests collection for DB and User Destinations data
        const userDests = await Object.entries(dests).reduce( async (prev, [key, value]) => {
            let awaitPrev = await prev
            let {city, country, placeLabel, position, url, ...rest}  = value
            let destObj = {destId: key, city, country, placeLabel, position, url} //create dest object
            let savedDest = await upsertDest(key, destObj) // save dest object in dests collection in DB (map_locations)
            return [...awaitPrev, {Id: savedDest._id, ...rest}] // return array of Dests and meta data in 'rest'
        }, [])

        // update user with userDests
        await dbUser.upsertUser(userId, {destinations: userDests}) // save array of Dests and meta data to user collection in DB
        return userDests
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
        }
    
        let upsertedDest = await Dest.findOneAndUpdate(find, update, options).lean()
        return upsertedDest 
    }
    catch(e){
        throw new Error(`Unable to create destinations in DB: ${JSON.stringify(e)}`)
    }
}

module.exports = {
    getDestsByObjId,
    getDestsByUserId,
    upsertDestsByUserId
}