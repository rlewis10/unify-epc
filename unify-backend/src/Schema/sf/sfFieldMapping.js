const contact = {
    id : unifyId__c,
    accountId,
    Email,
    username : username__c,
    hashPassword : hashPassword__c,
    isActive : isActive__c,
    alerts : {
        newsletter : Email_Alert_Newsletter__c,
        weekly : Email_Alert_Weekly__c,
        monthly : Email_Alert_Monthly__c,
        adhoc : Email_Alert_adhoc__c
    },
    budget : {
        from : budget_from__c,
        to : budget_to__c,
    },
    TravelDates : {
        0 : Jan__c,
        1 : Feb__c,
        2 : Mar__c,
        3 : Apr__c,
        4 : May__c,
        5 : Jun__c,
        6 : Jul__c,
        7 : Aug__c,
        8 : Sep__c,
        9 : Oct__c,
        10 : Nov__c,
        11 : Dec__c
    }
}

const destinaton = {
    Id : Map_Location_Id__c,
    placeLabel : Name,
    url : Maps_Link__c,
    city : City__c,
    country : Country__c,
    position : {
        long : Position__Longitude__s,
        lat: Position__Latitude__s
    }
}