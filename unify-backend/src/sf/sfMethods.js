const sfAuth = require('./sfAuth')

const getContact = async (data) => {
  const sf = await sfAuth.get()
  let contact = await sf.sobject('Contact').find({
    Email : data.conEmail,
    'Account.Account_Id__c' : data.AccountId
  },
    ['Id', 'FirstName', 'LastName', 'Email', 'Account.Account_Id__c'])
    .sort({ LastModifiedDate: -1 })
    .limit(1)
    return contact
}

const createContact = async (data) => {
  const sf = await sfAuth.get()
  data['Account'] = {Account_Id__c : data.AccountId}
  return await sf.sobject('Contact').create(data)
}

const updateContact = async (id, data) => {
  const sf = await sfAuth.get()
  data['sfId'] = id
  return await sf.sobject('Contact').update(data)
}

const findUser = (username) => {

}

const checkPassword = (user, password) => {
  return true
}


module.exports = {
    createContact : createContact,
    getContact : getContact,
    updateContact : updateContact
}