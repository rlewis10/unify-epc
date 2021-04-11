import React, {useContext} from 'react'
import {useAuthContext} from '../../context/authContext'

const Signup = (props) => {

  const {auth, signup} = useContext(useAuthContext)

  // on submit redirect to this:
  //const {location: {state: {referrer}}} = props

  const onSubmit = async () => {
    await signup({username: 'test', password: 'test'})
    console.log(`new token: ${JSON.stringify(auth)}`)
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      <form>
      <label>
          <p>First Name</p>
          <input type="text" />
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" />
        </label>
        <label>
          <p>Email</p>
          <input type="email" />
        </label>
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

export default Signup