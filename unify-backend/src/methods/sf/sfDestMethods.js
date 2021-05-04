const sfAuth = require('./sfAuth')
const sfSchema = require('../../schema/sf/sfSchema')

// UPSERT a list of map_locations, a single record for each location in the google maps api.
const createMapLoc = async (locs) => {
  const sfLocs = Object.keys(locs).reduce((prev, loc) => {
    let sfDataMap = sfSchema.constr(locs[loc], 'location')
    sfDataMap['Map_Location_Id__c'] = loc
    return [...prev, sfDataMap]
  },[])

  const sf = await sfAuth.get()
  let createdMapLocations = await sf.sobject('Map_Location__c').upsert(sfLocs,'Map_Location_Id__c')
  
  let returnRecs = createdMapLocations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${JSON.stringify(returnRecs)}}`)}
  return createdMapLocations 
}
  
//list of destinations for an individual contact should not be handled by SF and only through mongo. 

// UPSERT a list of destinations, linking a contact to a map_location
const upsertDest = async (conId, dests) => {
  const sfDests = Object.keys(dests).reduce((prev, dest) => {
    let destData = {conId : conId, mapLocId: dest, placeLabel: dests[dest]['placeLabel'], active: true}
    let sfDataMap = sfSchema.constr(destData, 'destination')
    return [...prev, sfDataMap]
  },[])

  const sf = await sfAuth.get()
  let createdDestinations = await sf.sobject('Destination__c').upsert(sfDests,'Destination_Id__c')

  let returnRecs = createdDestinations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${JSON.stringify(returnRecs)}}`)}
  return createdDestinations 
}

// deactivate a list of destinations
const deactivateDest = async (conId, dests) => {
  let sfDestsDel = []
  Object.keys(dests).map(d => {
    sfDestsDel.push({
      Destination_Id__c: `${d}-${conId}`,
      isActive__c: false})
  })
  const sf = await sfAuth.get()
  let deactivedDestinations = await sf.sobject('Destination__c').upsert(sfDestsDel,'Destination_Id__c')

  let returnRecs = deactivedDestinations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${JSON.stringify(returnRecs)}`)}
  return deactivedDestinations 
}

  module.exports = {
    createMapLoc,
    upsertDest,
    deactivateDest
}