const Dest = require('../../Schema/db/DestSchema')
const dbUser = require('../../methods/db/dbUserMethods')
const { access } = require('fs')

// find destination list from user id
const getDestsByUserId = async (id) => {
    try{
        // get user destination Ids from user object 
        let user = await dbUser.getUserObj(id)
        let destIds = user.destinations

        // cycle through dest object Ids and get dest data
        return destIds.reduce(async (obj, dest) => {
            let destObj = await obj // wait for the prev promise to resolve
            let {destId, ...rest}  = await getDestsByObjId(dest) // destruct the destId from rest of dest data
            return {...destObj, [destId] : rest} // use spread operator to add new item to object without overwritting old object
        },{})
    }
    catch(e){
        throw new Error(`Cannot get user's destinations: ${JSON.stringify(e)}`)
    }
}

// find destination list from object Id
const getDestsByObjId = async (id) => {
    try{
        let dests = await Dest.findById(id).lean()
        return dests
    }
    catch(e){
        throw new Error(`Unalbe to return destinations from DB: ${JSON.stringify(e)}`)
    }
}

// create new destinations, returns the inserted document
const createDest = async (data) => {
    // check if dest exists using destId

    // const dests = structObj(data)
    const newDests = new Dest(data)
    return await newDests.save()
}

//update destination list, salesforce handles 'decactivated' destinations by upserting 'isActive' data. 
const updateDest = async (id, data) => {
    let updatedDest = await Dest.findOneAndUpdate({_id: id}, data)
    return updatedDest 
}

module.exports = {
    getDestsByObjId,
    getDestsByUserId,
    createDest,
    updateDest
}