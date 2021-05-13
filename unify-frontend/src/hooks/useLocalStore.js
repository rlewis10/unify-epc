import {useState, useEffect} from 'react'

// initialValue =>
//  if an array of local store keys, get values from local storage. ['userId', 'accessToken', 'refreshToken', 'isAuthenticated']
//  if an object save directly to state and then save to local storage.

const useLocalStore = (initialValues = undefined) => {

    // get data from local storage
    const getLocalStore = (values) => {
        if(values instanceof Array) { 
            return values.reduce((prev, key) => {
                const savedValue = JSON.parse(localStorage.getItem(key))
                return {...prev, [key] : savedValue}
            },{})
        }
        return values
    }

    // store data in local storage
    const saveLocalStore = (values) => {
        if(values instanceof Object) {
            Object.entries(values).map(([key, value]) => {
                return localStorage.setItem(key, JSON.stringify(value))
            })
        }
    }

    // state for local storage
    const [localStore, setLocalStore] = useState(() => {
        return getLocalStore(initialValues)
    })

    useEffect(() => {
        saveLocalStore(localStore)
    },[localStore])

    return [localStore, setLocalStore]
}

export default useLocalStore