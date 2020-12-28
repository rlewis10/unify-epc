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



module.exports = {
    createContact : createContact,
    getContact : getContact,
    findContact : findContact,
    updateContact : updateContact
}