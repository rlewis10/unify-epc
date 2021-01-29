const sfAuth = require('./sfAuth')

const findContact = async (data) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    Email : data.Email,
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

// get a contact, INPUT: unifyId; RETURN: SFID
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

// UPSERT contact, INPUT: unifyId, data; RETURN: updated contact
const upsertContact = async (id, data) => {
  const sf = await sfAuth.get()
  data['UnifyId__c'] = id
  let updatedContact =  await sf.sobject('Contact').upsert(data,'UnifyId__c')

  if (Object.entries(contact).length === 0) {throw new Error(`No contact upserted`)}
  return updatedContact 
}

  // creates object for the Contact object
  const createContactObj = (con) => {
    let {id, accountId, email, username, hashPassword, isActive, alerts:{newsletter, weekly, monthly, adhoc}, budget : {from , to}, TravelDates: []} = con
    return {
      unifyId__c : id,
      accountId,
      firstName,
      lastName,
      email,
      username__c : username,
      hashPassword__c : hashPassword,
      isActive__c : isActive,
      Email_Alert_Newsletter__c : alerts.newsletter,
      Email_Alert_Weekly__c : alerts.weekly,
      Email_Alert_Monthly__c : alerts.monthly,
      Email_Alert_adhoc__c : alerts.adhoc,
      budget_from__c : budget.from,
      budget_to__c : budget.to,
      Jan__c : TravelDates [0],
      Feb__c : TravelDates [1],
      Mar__c : TravelDates [2],
      Apr__c : TravelDates [3],
      May__c : TravelDates [4],
      Jun__c : TravelDates [5],
      Jul__c : TravelDates [6],
      Aug__c : TravelDates [7],
      Sep__c : TravelDates [8],
      Oct__c : TravelDates [9],
      Nov__c : TravelDates [10],
      Dec__c : TravelDates [11]
    }
  }

module.exports = {
    createContact,
    getContactId,
    findContact,
    upsertContact
}

