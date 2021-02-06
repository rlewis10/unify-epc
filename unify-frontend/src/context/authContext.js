import React, {useState, createContext} from 'react'
import axios from 'axios'

const useAuthContext = createContext()

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false 
  })

  // send username and password to login auth api and save received tokens
  const login = async (login) => {
    try{
      const res = await axios.post('https://localhost:3001/auth/login/', login)
      const {accessToken, refreshToken, isAuthenticated} = await res.data
      setAuth(prevState => ({...prevState, accessToken, refreshToken ,isAuthenticated}))
      saveTokens(accessToken, refreshToken)
    }
    catch(e){
      console.log(e)
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

  const validToken = () => {

  }

  return (
    <useAuthContext.Provider value={{auth, setAuth, login, signup, getToken, saveTokens, validToken}}>
        {props.children}
    </useAuthContext.Provider>
  )
}

export {useAuthContext, AuthProvider}