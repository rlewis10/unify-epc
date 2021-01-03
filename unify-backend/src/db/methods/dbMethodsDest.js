const db = require('mongoose')
const Dest = require('../schema/DestSchema')

// create new destinations, returns the inserted document
const createDest = async (data) => {
    const dest = new Dest({
        
    })
    return await dest.save()
}

//update destination list, salesforce handles 'decactivated' destinations by upserting 'isActive' data. 
const updateDest = async (id, data) => {
    let updatedDest = await Dest.findOneAndUpdate({_id: id}, data)
    return updatedDest 
}

module.exports = {
    createDest,
    updateDest
}