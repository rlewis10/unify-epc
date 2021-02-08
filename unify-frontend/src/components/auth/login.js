import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../context/authContext'

const Login = (props) => {

  const {Auth, setAuth, login} = useContext(useAuthContext)
  const [forwardLocation] = useState(props.location.state.referrer)
  const [Error, setError] = useState(null)
  const history = useHistory()

  const handleChange = (e) => {
    setAuth(prevProfile => ({...prevProfile, [e.target.name] : e.target.value}))
  }

  const handleSubmit = async (e) => {
    try{
      e.preventDefault()
      console.log('submitted')
      const res = await login({username: Auth.username, password: Auth.password})

      if(res.isAuthenticated) {
        history.push(forwardLocation)
      }
      else{
        // thorw error to show in UI
        console.log('login not successful')
      }
    }
    catch(e){
      console.log(e)
      setError(e)
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      {Error ? (<span> {Error} </span>) : null}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" name="username" value={Auth.username} onChange={handleChange}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" name="password" value={Auth.password} onChange={handleChange}/>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Login