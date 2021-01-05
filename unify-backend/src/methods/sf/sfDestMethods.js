const sfAuth = require('./sfAuth')

// UPSERT a list of map_locations, a single record for each location in the google maps api.
const createMapLoc = async (loc) => {
    let sfLocs = []
    Object.keys(loc).map(l => {
      sfLocs.push(createMapLocObj(l, loc[l]))
    })
    const sf = await sfAuth.get()
    let createdMapLocations = await sf.sobject('Map_Location__c').upsert(sfLocs,'Map_Location_Id__c')
    
    let returnRecs = createdMapLocations.filter(r =>!r.success)
    if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${JSON.stringify(returnRecs)}}`)}
    return createdMapLocations 
  }
  
  // creates object for the Map_Location__c object
  const createMapLocObj = (key, dest) => {
    let {placeLabel, url, city, country, position:{lng, lat}} = dest
    return {
      Name: placeLabel,
      Map_Location_Id__c: key,
      Maps_Link__c: url,
      City__c: city,
      Country__c:  country,
      Position__Latitude__s: lat,
      Position__Longitude__s: lng
    }
  }
  
  //list of destinations for an individual contact should not be handled by SF and only through mongo. 
  
  // UPSERT a list of destinations, linking a contact to a map_location
  const upsertDest = async (conId, dests) => {
    let sfDests = []
    Object.keys(dests).map(d => {
      sfDests.push(createDestObj(conId,d))
    })
    const sf = await sfAuth.get()
    let createdDestinations = await sf.sobject('Destination__c').upsert(sfDests,'Destination_Id__c')
  
    let returnRecs = createdDestinations.filter(r =>!r.success)
    if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${JSON.stringify(returnRecs)}}`)}
    return createdDestinations 
  }
  
  // creates object for the Destination__c composite object
  const createDestObj = (conId, mapLocId) => {
    return {
      Destination_Id__c: `${mapLocId}-${conId}`,
      Name: `${mapLocId}-${conId}`,
      Map_Location__r: {Map_Location_Id__c: mapLocId},
      Contact__r: {UnifyId__c : conId}
    }
  }
  
  // deactivate a list of destinations
  const deactivateDest = async (conId, dests) => {
    let sfDests = []
    Object.keys(dests).map(d => {
      sfDests.push({
        Destination_Id__c: `${d}-${conId}`,
        isActive__c: false})
    })
    const sf = await sfAuth.get()
    let deactivedDestinations = await sf.sobject('Destination__c').upsert(sfDests,'Destination_Id__c')
  
    let returnRecs = deactivedDestinations.filter(r =>!r.success)
    if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${JSON.stringify(returnRecs)}}`)}
    return deactivedDestinations 
  }

  module.exports = {
    createMapLoc,
    upsertDest,
    deactivateDest
}