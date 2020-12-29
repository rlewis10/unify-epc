const sfAuth = require('./sfAuth')

const findContact = async (data) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    Email : data.conEmail,
    'Account.UnifyId__c' : data.AccountId
  },
    ['Id', 'FirstName', 'LastName', 'Email', 'Account.UnifyId__c'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)
  return contact
}

const getContact = async (id) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    UnifyId__c : id
  },
    ['Id'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)
  return contact
}

const createContact = async (data) => {
  const sf = await sfAuth.get()
  data['Account'] = {UnifyId__c : data.AccountId}
  return await sf.sobject('Contact').create(data)
}

// update contact with unify unique Id
const updateContact = async (id, data) => {
  const sf = await sfAuth.get()
  data['UnifyId__c'] = id
  return await sf.sobject('Contact').update(data)
}

// UPSERT a list of map_locations, a single record for each location in the google maps api.
const createMapLocations = async (loc) => {
  let sfLocs = []
  Object.keys(loc).map(l => {
    sfLocs.push(createMapLocationObj(l, loc[l]))
  })
  const sf = await sfAuth.get()
  return await sf.sobject("Map_Location__c").upsert(sfLocs,'Map_Location_Id__c',{ allOrNone: true })
}

// creates object for the Map location object
const createMapLocationObj = (key, dest) => {
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

// UPSERT a list of destinations, linking a contact to a map_location

// creates object for the destination composite object
const createDestinationObj = (conId, mapLocId) => {
  return {
    Destination_Id__c: `${conId}-${mapLocId}`,
    Name: `${conId}-${mapLocId}`,
    Map_Location__c: {Map_Location_Id__c : mapLocId},
    Contact__c: {UnifyId__c : conId}
  }
}

module.exports = {
    createContact : createContact,
    getContact : getContact,
    findContact : findContact,
    updateContact : updateContact,
    createMapLocations: createMapLocations
}

