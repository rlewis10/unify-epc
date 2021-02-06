import React, {useContext} from 'react'
import {useAuthContext} from '../../context/authContext'

const Login = (props) => {

  const {auth, login} = useContext(useAuthContext)

  // on submit redirect to this:
  //const {location: {state: {referrer}}} = props

  const onSubmit = async () => {
    await login({username: 'richard@rlewis.me', password: '123456'})
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
      </form>
      <button type="submit" onClick={onSubmit}>submit</button>
    </div>
  )
}

export default Login