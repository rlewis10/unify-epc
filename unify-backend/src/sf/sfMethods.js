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

  if (!contact.success) {throw new Error('No record successfully retrieved') }
  else return contact
}

// get a contact returning SFID
const getContact = async (id) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    UnifyId__c : id
  },
    ['Id'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)

  if (!contact.success) {throw new Error('No record successfully retrieved')}
  else return contact
}

const createContact = async (data) => {
  const sf = await sfAuth.get()
  data['Account'] = {UnifyId__c : data.AccountId}
  let createdContact = await sf.sobject('Contact').create(data)

  if (!createdContact.success) {throw new Error('No contact created')}
  else return createdContact
}

// UPSERT contact with unify unique Id
const upsertContact = async (id, data) => {
  const sf = await sfAuth.get()
  data['UnifyId__c'] = id
  let updatedContact =  await sf.sobject('Contact').upsert(data,'UnifyId__c')

  if (!updatedContact.success) {throw new Error('No contact upserted')}
  else return updatedContact 
}

// UPSERT a list of map_locations, a single record for each location in the google maps api.
const createMapLocations = async (loc) => {
  let sfLocs = []
  Object.keys(loc).map(l => {
    sfLocs.push(createMapLocationObj(l, loc[l]))
  })
  const sf = await sfAuth.get()
  let createdMapLocations = await sf.sobject('Map_Location__c').upsert(sfLocs,'Map_Location_Id__c')
  
  let returnRecs = createdMapLocations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${returnRecs}}`)}
  else return createdMapLocations 
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
const createDestinations = async (conId, dests) => {
  let sfDests = []
  Object.keys(dests).map(d => {
    sfDests.push(createDestinationObj(conId,d))
  })
  const sf = await sfAuth.get()
  let createdDestinations = await sf.sobject('Destination__c').upsert(sfDests,'Destination_Id__c')

  let returnRecs = createdDestinations.filter(r =>!r.success)
  if(returnRecs.length >= 1) {throw new Error(`Destinations not created: ${returnRecs}}`)}
  else return createdDestinations 
}

// creates object for the destination composite object
const createDestinationObj = (conId, mapLocId) => {
  return {
    Destination_Id__c: `${mapLocId}-${conId}`,
    Name: `${mapLocId}-${conId}`,
    Map_Location__r: {Map_Location_Id__c: mapLocId},
    Contact__r: {UnifyId__c : conId}
  }
}

module.exports = {
    createContact : createContact,
    getContact : getContact,
    findContact : findContact,
    upsertContact : upsertContact,
    createMapLocations: createMapLocations,
    createDestinations: createDestinations
}

