const Dest = require('../../Schema/db/DestSchema')
const dbUser = require('./dbUserMethods')

// find trips list from user id
const getTripsByUserId = async (userId) => {
    try{
        // get user trip Ids from user object 
        const user = await dbUser.getUserObj(userId)
        const trips = user.trips
        // cycle through trips object Ids and get dest data
        return trips.reduce(async (obj, dest) => {
            let destObj = await obj // wait for the prev promise to resolve
            let {destId, ...rest}  = await getTripsByObjId(dest.Id) // destruct the destId from rest of dest data
            return {...destObj, [destId] : {...rest, ...dest}} // use spread operator to add new item to object without overwritting old object
        },{})
    }
    catch(e){
        throw new Error(`Cannot get user's trips: ${JSON.stringify(e)}`)
    }
}

// find single trip from dests collection
const getTripsByObjId = async (id) => {
    try{
        const options = {
            projection: { _id: 0, __v: 0 }, // without return _id and __v
          }
        let dests = await Dest.findById(id, options).lean()
        return dests
    }
    catch(e){
        throw new Error(`Unable to return trips from DB: ${JSON.stringify(e)}`)
    }
}

// create new destinations in dests collection, returns the inserted document
const upsertTripsByUserId = async (userId, dests) => {
    try{
        // cycle through dests object separating dests collection for DB and User trips data
        const userDests = await Object.entries(dests).reduce( async (prev, [key, value]) => {
            let awaitPrev = await prev
            let {city, country, placeLabel, position, url, ...rest}  = value
            let destObj = {destId: key, city, country, placeLabel, position, url} //create dest object
            let savedDest = await upsertDest(key, destObj) // save dest object in dests collection in DB (map_locations)
            return [...awaitPrev, {Id: savedDest._id, ...rest}] // return array of Dests and meta data in 'rest'
        }, [])

        // update user with userDests
        await dbUser.upsertUser(userId, {trips: userDests}) // save array of Trips and meta data to user collection in DB
        return userDests
    }
    catch(e){
        throw new Error(`Unable to create destinations in DB: ${JSON.stringify(e)}`)
    }
}

// find a destination by destId and update
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
    getTripsByObjId,
    getTripsByUserId,
    upsertTripsByUserId
}