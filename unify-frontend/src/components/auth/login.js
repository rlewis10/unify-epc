import React, {useContext, useEffect} from 'react'
import {useAuthContext} from '../../context/authContext'

const Login = (props) => {

  const {auth, accessToken} = useContext(useAuthContext)

  // on submit redirect to this:
  //const {location: {state: {referrer}}} = props

  const onSubmit = async () => {
    await accessToken({username: 'test'})
    console.log(`new token: ${JSON.stringify(auth)}`)
  }


  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <button type="submit" onClick={onSubmit}>test</button>
    </div>
  )
}

export default Login