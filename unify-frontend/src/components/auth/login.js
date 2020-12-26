import React, {useContext} from 'react'
import {useAuthContext} from '../../context/authContext'

const Login = (props) => {

  const {Auth} = useContext(useAuthContext)

  // on submit redirect to this:
  const {location: {state: {referrer}}} = props

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
    </div>
  )
}

export default Login