const schema = {
    contact : class {
        constructor(data){
            this.UnifyId__c = data?.id
            this.Account  = {UnifyId__c : data?.accountId}
            this.FirstName = data?.firstName
            this.LastName = data?.lastName
            //this.dob = data.dob
            this.Email = data?.email
            this.isActive__c = data?.isActive
            this.Email_Alert_Newsletter__c = data?.alerts?.newsletter
            this.Email_Alert_Weekly__c = data?.alerts?.weekly
            this.Email_Alert_Monthly__c = data?.alerts?.monthly
            this.Email_Alert_adhoc__c = data?.alerts?.adhoc
            this.budget_from__c = data?.budget?.from
            this.budget_to__c = data?.budget?.to 
        }
    },
    location : class {
        constructor(data){
            this.Map_Location_Id__c = data?.Id
            this.Name = data?.placeLabel
            this.Maps_Link__c = data?.url
            this.City__c = data?.city
            this.Country__c = data?.country
            this.Position__Longitude__s = data?.position?.lng
            this.Position__Latitude__s = data?.position?.lat
        }
    },
    trip : class {
        constructor(data) {
            this.Trip_Id__c =`${data?.destId}-${data?.conId}`
            this.Name = data?.placeLabel
            this.Map_Location__r = {Map_Location_Id__c: data?.destId} 
            this.Contact__r = {UnifyId__c : data?.conId} 
            this.isActive__c = data?.active 
        }
    }
}

// function to build sf object from class in schema and data passed into function
const sfConstObj = (data, lookupRef) => {
    const map = schema[lookupRef]
    return new map(data)
}

// recursive function to map over keys in object and replace the key with the SF field api name
// const mapper = (data, map, obj) => {
//     Object.entries(data).map(([key, value]) => {
//         typeof value === 'object' ?
//             mapper(value, map[key] || map, obj) :
//             obj[map[key] || key] = value
//     })
// }

module.exports = {
    constr: sfConstObj
}