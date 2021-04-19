import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../context/authContext'

const Signup = (props) => {

  const {Auth, setAuth, login} = useContext(useAuthContext)
  //const [forwardLocation] = useState(props.location.state.referrer)
  const [Signup, setSignup] = useState({})
  const [Error, setError] = useState(null)
  const history = useHistory()

  const handleChange = (e) => {
    setAuth(prevProfile => ({...prevProfile, [e.target.name] : e.target.value}))
  }

  const handleSubmit = async (e) => {
    try{
      e.preventDefault()
      const res = await login({username: Auth.username, password: Auth.password})
      // username: richard@rlewis.me; password: 123456

      if(res?.isAuthenticated) {
        //history.push(forwardLocation)
      }
      else{
        // thorw error to show in UI
        setError('Username or Password is incorrect')
      }
    }
    catch(e){
      console.log(e)
    }
  }

  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <label>
          <p>First Name</p>
          <input type="text" name="firstName" value={Signup.firstName} onChange={handleChange}/>
        </label>
        <label>
          <p>Last Name</p>
          <input type="text" name="lastName" value={Signup.lastName} onChange={handleChange}/>
        </label>
        <label>
          <p>Email</p>
          <input type="email" name="email" value={Signup.email} onChange={handleChange}/>
        </label>
        <label>
          <p>Username</p>
          <input type="text" name="username" value={Signup.username} onChange={handleChange}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" value={Signup.password} onChange={handleChange}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup