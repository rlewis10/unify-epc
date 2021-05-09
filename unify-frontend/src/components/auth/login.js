import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../context/authContext'
import * as yup from 'yup'  
import {useFormik} from 'formik'

const Login = (props) => {

  const {login} = useContext(useAuthContext)
  const [forwardLocation] = useState(props.location.state.referrer)
  const [loginError, setLoginError] = useState(null)
  const history = useHistory()

  const validationSchema = yup.object({
    username: yup
      .string('Enter a Username')
      .required('Username is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues : {username: '', password: ''},
    validationSchema : validationSchema,
    onSubmit : (values) => {submitToServer(values)}
  })

  const submitToServer = async (values) => {
    try{
      const res = await login({username: values.username, password: values.password})
      // username: richard@rlewis.me; password: 123456
      res?.isAuthenticated
        ? history.push(forwardLocation)
        : setLoginError('Username or Password is incorrect')
    }
    catch(e){
      console.log(e)
    }
  }
  console.log(formik)

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      {loginError ? (<span> {loginError} </span>) : null}
      <form onSubmit={formik.handleSubmit} >
        <label htmlFor="username"><p>Username</p></label>
          <input type="text" id="username" name="username" onChange={formik.handleChange} values={formik.values.username} />
          {formik.touched.username && formik.errors.username
            ? (<span className="error">{formik.errors.username}</span>)
            : (null)}
        <label htmlFor="password"><p>Password</p></label>
          <input type="password" id="password" name="password" onChange={formik.handleChange} values={formik.values.password} />
          {formik.touched.password && formik.errors.password
            ? (<span className="error">{formik.errors.password}</span>)
            : (null)}
        <button type="submit" >Submit</button>
      </form>
    </div>
  )
}

export default Login