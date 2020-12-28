import React, {useState, createContext} from 'react'
import axios from 'axios'

const useAuthContext = createContext()

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    username: '',
    accessToken: '',
    isAuthenticated: true
  })

  const accessToken = async (login) =>{
    try{
      const res = await axios.get('/api/token', login)
      const accessToken = await res.data.accessToken
      setAuth(prevState => ({...prevState, accessToken: accessToken, isAuthenticated : true}))
      saveToken(accessToken)
    }
    catch(e){
      console.log(e)
    }
  }

  const getToken = () => {
    const userToken = JSON.parse(localStorage.getItem('accessToken'))
    return userToken.token
  }

  const saveToken = async (userToken) => {
    localStorage.setItem('accessToken', JSON.stringify(userToken))
  }

  const validToken = () => {

  }

  return (
    <useAuthContext.Provider value={{auth, setAuth, accessToken, getToken, saveToken, validToken}}>
        {props.children}
    </useAuthContext.Provider>
  )
}

export {useAuthContext, AuthProvider}