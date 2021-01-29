const Dest = require('../../Schema/db/DestSchema')

// find destination list from object id
const getDestObj = async (id) => {
    return await Dest.findById(id)
}

// create new destinations, returns the inserted document
const createDest = async (data) => {
    const dest = new Dest({data})
    return await dest.save()
}

//update destination list, salesforce handles 'decactivated' destinations by upserting 'isActive' data. 
const updateDest = async (id, data) => {
    let updatedDest = await Dest.findOneAndUpdate({_id: id}, data)
    return updatedDest 
}

module.exports = {
    createDest,
    updateDest,
    getDestObj
}