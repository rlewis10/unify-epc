const schema = {
    contact : {
        id : 'unifyId__c',
        accountId : 'accountId',
        Email : 'Email',
        username : 'username__c',
        hashPassword : 'hashPassword__c',
        isActive : 'isActive__c',
        alerts : {
            newsletter : 'Email_Alert_Newsletter__c',
            weekly : 'Email_Alert_Weekly__c',
            monthly : 'Email_Alert_Monthly__c',
            adhoc : 'Email_Alert_adhoc__c'
        },
        budget : {
            from : 'budget_from__c',
            to : 'budget_to__c',
        }
        // TravelDates : {
        //     0 : Jan__c,
        //     1 : Feb__c,
        //     2 : Mar__c,
        //     3 : Apr__c,
        //     4 : May__c,
        //     5 : Jun__c,
        //     6 : Jul__c,
        //     7 : Aug__c,
        //     8 : Sep__c,
        //     9 : Oct__c,
        //     10 : Nov__c,
        //     11 : Dec__c
        // }
    },
    location : {
        Id : 'Map_Location_Id__c',
        placeLabel : 'Name',
        url : 'Maps_Link__c',
        city : 'City__c',
        country : 'Country__c',
        position : {
            lng : 'Position__Longitude__s',
            lat: 'Position__Latitude__s'
        }
    },
    destination : class {
        constructor(data) {
            this.Destination_Id__c =`${data.mapLocId}-${data.conId}` || null
            this.Name = data.placeLabel || null
            this.Map_Location__r = {Map_Location_Id__c: data.mapLocId} || null
            this.Contact__r = {UnifyId__c : data.conId} || null
            this.isActive__c = data.active || null
        }
    }
}

// wrapper function that calls the 'mapper' or 'builder' function, then assgins the new SF field api name key and their values to a new object
const sfConstObj = (data, lookupRef) => {
    let sfObj = {}
    const map = schema[lookupRef]
    switch(lookupRef) {
        case 'contact' : 
            mapper(data, map, sfObj)
            break
        case 'location' : 
            mapper(data, map, sfObj)
            break
        case 'destination' : 
            builder(data, map, sfObj)
            break
        default : 
            throw new Error(`unable to find lookup reference value that matches the schema`)
      }
    return sfObj
}

// recursive function to map over keys in object and replace the key with the SF field api name
const mapper = (data, map, obj) => {
    Object.entries(data).map(([key, value]) => {
        typeof value === 'object' ?
            mapper(value, map[key] || map, obj) :
            obj[map[key] || key] = value
    })
}

// function to build sf object from class in schema and data passed into function
const builder = (data, map, obj) => {
    let newObj = new map(data)
    Object.assign(obj, newObj)
}

module.exports = {
    constr: sfConstObj
}