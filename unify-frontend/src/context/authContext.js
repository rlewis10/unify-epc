import React, {useState, createContext} from 'react'
import axios from 'axios'

const useAuthContext = createContext()

const AuthProvider = (props) => {

  const localStoreKeys = ['userId', 'accessToken', 'refreshToken', 'isAuthenticated']
  const [Auth, setAuth] = useState({
    userId: '',
    accessToken: '',
    refreshToken: '',
    isAuthenticated: undefined
  })

  // create a new user 
  const signup = async (signup) => {
    try{

    }
    catch(e){

    }
  }

 // send username and password to login auth api and save received tokens
  const login = async (login) => {
    try{
      const res = await axios({
        method: 'post',
        url: '/auth/login/',
        data: login,
      })
      const {userId, accessToken, refreshToken, isAuthenticated} = res.data
      setAuth(prevState => ({...prevState, userId, accessToken, refreshToken, isAuthenticated}))
      saveLocalStore({userId, accessToken, refreshToken})
      return res.data
    }
    catch(e){
      console.log(e.message)
    }
  }

  // remove userId and tokens (key/values) from state and local storage
  const logout = () => {
    setAuth({isAuthenticated: false})
    localStoreKeys.map(d => localStorage.removeItem(d))
  }

  // verify accessToken, if accessToken has expired refresh token with renewToken function
  const verifyToken = async () => {
    try{ 
      if(Auth.isAuthenticated === undefined){
        const res = await axios({
          method: 'get', 
          url: '/auth/verifytoken/',
          headers: authHeader()
        })
        const {userId, accessToken, refreshToken} = getLocalStore(localStoreKeys)
        setAuth(prevState => ({...prevState, userId, accessToken, refreshToken, isAuthenticated: res.data.isAuthenticated}))
        return res.data
      }
    }
    catch(e){
      if(e?.response.status === 401){
        const {userId, refreshToken} = getLocalStore(localStoreKeys)
        return await renewToken(userId, refreshToken)
      }
    }
  }

  // renew the accessToken with the refreshToken
  const renewToken = async (userId, oldRefreshToken) => {
    try{
      const res = await axios({
        method: 'post', 
        url: '/auth/renewtoken/',
        data: {userId, refreshToken: oldRefreshToken}
      })
      const {accessToken, refreshToken, isAuthenticated} = res.data
      setAuth(prevState => ({...prevState, accessToken, refreshToken, isAuthenticated}))
      saveLocalStore({accessToken})
      return res.data
    }
    catch(e){
      setAuth(prevState => ({...prevState, isAuthenticated: e.response.data.isAuthenticated}))
    }
  }

  // check if token and user is in local storage, return  userId and accessToken for API header 
  const authHeader = () => {
    try{
      const {userId, accessToken} = getLocalStore(localStoreKeys)
      if(userId && accessToken) {
        return {userId, accessToken}
      }
    }
    catch(e){
      console.log(`No tokens in local storage ${e}`)
    }
  }

  // get data from local storage
  const getLocalStore = (data) => {
    let localStore = {}
    data.map((key) => {
      return localStore[key] = JSON.parse(localStorage.getItem(key)? localStorage.getItem(key): null)
    })
    return localStore
  }

  // store data in local storage
  const saveLocalStore = (data) => {
    Object.keys(data).map((key) => {
      return localStorage.setItem(key, JSON.stringify(data[key]))
    })
  }

  return (
    <useAuthContext.Provider value={{Auth, setAuth, login, signup, verifyToken, authHeader, logout, getLocalStore}}>
        {props.children}
    </useAuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider}