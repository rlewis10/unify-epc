import React, {useState, createContext} from 'react'
import axios from 'axios'

const useAuthContext = createContext()

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    username: '',
    accessToken: '',
    refreshToken: '',
    isAuthenticated: true
  })

  const genTokens = async (login) =>{
    try{
      const res = await axios.get('/api/gettoken', login)
      const accessToken = await res.data.accessToken
      const refreshToken = await res.data.refreshToken
      setAuth(prevState => ({...prevState, accessToken: accessToken, refreshToken: refreshToken ,isAuthenticated : true}))
      saveTokens(accessToken, refreshToken)
    }
    catch(e){
      console.log(e)
    }
  }

  const getAccessToken = () => {
    const userToken = JSON.parse(localStorage.getItem('accessToken'))
    return userToken.token
  }

  const saveTokens = async (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', JSON.stringify(accessToken))
    localStorage.setItem('accessToken', JSON.stringify(refreshToken))
  }

  const validToken = () => {

  }

  return (
    <useAuthContext.Provider value={{auth, setAuth, genTokens, getAccessToken, saveTokens, validToken}}>
        {props.children}
    </useAuthContext.Provider>
  )
}

export {useAuthContext, AuthProvider}