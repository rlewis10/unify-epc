import React, {useState, createContext} from 'react'
import axios from 'axios'

const useAuthContext = createContext()

const AuthProvider = (props) => {
  const [Auth, setAuth] = useState({
    userId: '',
    username: '',
    password: '',
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false 
  })

 // send username and password to login auth api and save received tokens
  const login = async (login) => {
    try{
      const res = await axios.post('/auth/login/', login)
      const {userId, accessToken, refreshToken, isAuthenticated} = res.data
      setAuth(prevState => ({...prevState, userId, accessToken, refreshToken, isAuthenticated}))
      saveLocalStore({userId, accessToken, refreshToken})
      return res.data
    }
    catch(e){
      console.log(e.message)
    }
  }

  const signup = async (signup) => {
    try{

    }
    catch(e){

    }
  }

  // get data from the local storage
  const getLocalStore = (data) => {
    let localStore = {}
    Object.keys(data).map((key) => {
      return localStore[key] = JSON.parse(localStorage.getItem(key))
    })
    return localStore
  }

  // store data in the local storage
  const saveLocalStore = (data) => {
    Object.keys(data).map((key) => {
      return localStorage.setItem(key, JSON.stringify(data[key]))
    })
  }
  
  // vertify if the stored Access Token is valid, if true set isAuthenticated = TRUE
  const verifyToken = async () => {
    try{
      //const res = await axios.get('/auth/verifytoken/', { headers: {userId, accessToken} })
    }
    catch(e){
      console.log(e.message)
    }
  }

  const logout = (data) => {
    Object.keys(data).map((key) => {
      return localStorage.removeItem(key)
    })
  }

  return (
    <useAuthContext.Provider value={{Auth, setAuth, login, signup, getLocalStore, saveLocalStore, verifyToken, logout}}>
        {props.children}
    </useAuthContext.Provider>
  )
}

export {useAuthContext, AuthProvider}