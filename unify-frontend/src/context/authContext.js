import React, {useState, createContext} from 'react'
import axios from 'axios'

const useAuthContext = createContext()

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    username: '',
    token: '',
    isAuthenticated: false
  })

  const accessToken = (login) =>{
    axios
      .post('https://localhost:3080/login', login)
      .then(response => {
        const accessToken = response.data.accessToken
        saveToken(accessToken)
      })
      .catch(error=> {
        alert(error)
      })
  }

  const getToken = () => {
    const userToken = JSON.parse(sessionStorage.getItem('token'))
    return userToken.token
  }

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken))
    setAuth.token(userToken?.token);
  }

  const validToken = () => {

  }

  return (
    <useAuthContext.Provider value={{auth, accessToken, getToken, saveToken, validToken}}>
        {props.children}
    </useAuthContext.Provider>
  )
}

export {useAuthContext, AuthProvider}