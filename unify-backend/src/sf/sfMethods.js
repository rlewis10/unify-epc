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

const updateContact = async (id, data) => {
  const sf = await sfAuth.get()
  data['UnifyId__c'] = id
  return await sf.sobject('Contact').update(data)
}

const createMapLocation = async (loc) => {
  let sfLocs = []
  
  Object.keys(loc).map(l => {
    let {placeLabel, url, city, country, position:{lng, lat}} = loc[l]
    let sfLoc = {
      Name: placeLabel,
      Map_Location_Id__c: l,
      Maps_Link__c: url,
      City__c: city,
      Country__c:  country,
      Position__Latitude__s: lat,
      Position__Longitude__s: lng
    }
    
    sfLocs.push(sfLoc)
  })

  const sf = await sfAuth.get()
  return await sf.sobject("Map_Location__c").upsert(sfLocs,'Map_Location_Id__c',{ allOrNone: true })
}

module.exports = {
    createContact : createContact,
    getContact : getContact,
    findContact : findContact,
    updateContact : updateContact,
    createMapLocation: createMapLocation
}

