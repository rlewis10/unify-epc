const sfAuth = require('./sfAuth')
const sfSchema = require('../../schema/sf/sfSchema')

const findContact = async (data) => {
  const sf = await sfAuth.get()
  let sfDataCon = sfSchema.constr(data, 'contact')
  let contact = await sf.sobject('Contact').find({
    Email : sfDataCon.Email,
    'Account.UnifyId__c' : sfDataCon.accountId
  },
    ['Id', 'FirstName', 'LastName', 'Email', 'Account.UnifyId__c'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)

  if (Object.entries(contact).length === 0) {throw new Error(`No record successfully retrieved: ${JSON.stringify(contact)}`) }
  return contact
}

// get a contact, INPUT: unifyId; RETURN: SFID
const getContactId = async (id) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    UnifyId__c : id
  },
    ['Id'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)

  if (Object.entries(contact).length == 0) {throw new Error(`No record successfully retrieved: ${JSON.stringify(contact)}`)}
  return contact
}

// create a contact returning SFID
const createContact = async (data) => {
  const sf = await sfAuth.get()
  let sfDataCon = sfSchema.constr(data, 'contact')
  let createdContact = await sf.sobject('Contact').create(sfDataCon)
  if (!createdContact.success) {throw new Error(`No contact created`)}
  return createdContact
}

// UPSERT contact, INPUT: unifyId, data; RETURN: updated contact
const upsertContact = async (id, data) => {
  let sfDataCon = sfSchema.constr(data, 'contact')
  sfDataCon['UnifyId__c'] = id

  const sf = await sfAuth.get()
  let updatedContact =  await sf.sobject('Contact').upsert(sfDataCon,'UnifyId__c')

  if (updatedContact.success == false) {throw new Error(`No contact upserted ${JSON.stringify(returnRecs)}`)}
  return updatedContact 
}

module.exports = {
    createContact,
    getContactId,
    findContact,
    upsertContact
}

