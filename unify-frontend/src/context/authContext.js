import React, {useState, useEffect, createContext} from 'react'
import axios from 'axios'

const useAuthContext = createContext()

const AuthProvider = (props) => {
  const [Auth, setAuth] = useState({
    username: '',
    password: '',
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false 
  })

  // setup useEffect to fetch tokens

  useEffect(() => {

  
  }, [])

 // send username and password to login auth api and save received tokens
  const login = async (login) => {
    try{
      const res = await axios.post('/auth/login/', login)
      const {accessToken, refreshToken, isAuthenticated} = res.data
      setAuth(prevState => ({...prevState, accessToken, refreshToken, isAuthenticated}))
      saveTokens(accessToken, refreshToken)
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

  // get a token from the local storage
  const getToken = (tokenType) => {
    const userToken = JSON.parse(localStorage.getItem(tokenType))
    return userToken.token
  }

  // store tokens in the local storage
  const saveTokens = async (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
  }

  const verifyToken = () => {

  }

  const logout = () => {
    localStorage.removeItem('AccessToken')
    localStorage.removeItem('refreshToken')
  };

  return (
    <useAuthContext.Provider value={{Auth, setAuth, login, signup, getToken, saveTokens, verifyToken, }}>
        {props.children}
    </useAuthContext.Provider>
  )
}

export {useAuthContext, AuthProvider}