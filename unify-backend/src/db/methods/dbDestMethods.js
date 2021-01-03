const db = require('mongoose')
const Dest = require('../schema/DestSchema')

//update destination list, salesforce handles 'decactivated' destinations by upserting 'isActive' data. 
const updateDest = async (id, data) => {
    let updatedDest = await Dest.findOneAndUpdate({_id: id}, data)
    return updatedDest 
}

module.exports = {
    updateDest: updateDest
}