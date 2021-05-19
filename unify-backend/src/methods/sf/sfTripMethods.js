const sfAuth = require('./sfAuth')
const sfSchema = require('../../schema/sf/sfSchema')

// UPSERT a list of map_locations, a single record for each location in the google maps api.
const createMapLoc = async (locs) => {
  let sfLocs = Object.entries(locs).reduce((prev, [key, value]) => {
    let sfDataMap = sfSchema.constr(value, 'location')
    sfDataMap['Map_Location_Id__c'] = key
    return [...prev, sfDataMap]
  },[])

  const sf = await sfAuth.get()
  let createdMapLocations = await sf.sobject('Map_Location__c').upsert(sfLocs,'Map_Location_Id__c')
  
  let returnRecs = createdMapLocations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Map Locations not created: ${JSON.stringify(returnRecs)}}`)}
  return createdMapLocations 
}
  
// UPSERT a list of trips, linking a contact to a map_location
const upsertTrip = async (conId, oldDests, newDests) => {
  let destsObj = {...newDests, ...oldDests}
  let sfDests = Object.entries(destsObj).reduce((prev, [key, value]) => {
    value['destId'] = key
    value['conId'] = conId
    Object.keys(newDests).includes(key)
      ? value['active'] = true
      : value['active'] = false
    let sfDataMap = sfSchema.constr(value, 'trip')
    return [...prev, sfDataMap]
  },[])

  const sf = await sfAuth.get()
  let createdDestinations = await sf.sobject('Trip__c').upsert(sfDests,'Trip_Id__c')

  let returnRecs = createdDestinations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Trips not created: ${JSON.stringify(returnRecs)}}`)}
  return createdDestinations 
}

// deactivate a list of trips
const deactivateTrip = async (conId, dests) => {
  let sfDestsDel = Object.entries(dests).reduce(prev, dest => {
    return {
      Trip_Id__c: `${dest}-${conId}`,
      isActive__c: false}
  },[])
  const sf = await sfAuth.get()
  let deactivedDestinations = await sf.sobject('Trip__c').upsert(sfDestsDel,'Trip_Id__c')

  let returnRecs = deactivedDestinations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Trips not created: ${JSON.stringify(returnRecs)}`)}
  return deactivedDestinations 
}

  module.exports = {
    createMapLoc,
    upsertTrip,
    deactivateTrip
}