import React from 'react'
import queryString from 'query-string'

// custom hook for performing GET request
const getQueryParams = (urlParams) => {

    let params = queryString.parse(urlParams)
    if(Object.keys(params).length === 0) return
    return params

}

export default getQueryParams