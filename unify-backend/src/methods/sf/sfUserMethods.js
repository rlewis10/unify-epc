const sfAuth = require('./sfAuth')

const findContact = async (data) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    Email : data.conEmail,
    'Account.UnifyId__c' : data.accountId
  },
    ['Id', 'FirstName', 'LastName', 'Email', 'Account.UnifyId__c'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)

  if (Object.entries(contact).length === 0) {throw new Error(`No record successfully retrieved: ${JSON.stringify(contact)}`) }
  return contact
}

// create a contact returning SFID
const createContact = async (data) => {
  const sf = await sfAuth.get()
  let createdContact = await sf.sobject('Contact').create(data)

  if (!createdContact.success) {throw new Error(`No contact created`)}
  return createdContact
}

// get a contact returning SFID
const getContactId = async (id) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    UnifyId__c : id
  },
    ['Id'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)

  if (Object.entries(contact).length === 0) {throw new Error(`No record successfully retrieved: ${JSON.stringify(contact)}`)}
  return contact
}

// UPSERT contact with unify unique Id
const upsertContact = async (id, data) => {
  const sf = await sfAuth.get()
  data['UnifyId__c'] = id
  let updatedContact =  await sf.sobject('Contact').upsert(data,'UnifyId__c')

  if (Object.entries(contact).length === 0) {throw new Error(`No contact upserted`)}
  return updatedContact 
}

module.exports = {
    createContact,
    getContactId,
    findContact,
    upsertContact
}

