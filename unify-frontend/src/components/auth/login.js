import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../hooks/authContext'
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
      .required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      username: '', 
      password: ''
    },
    validationSchema : validationSchema,
    onSubmit : (values) => {submitToServer(values)}
  })

  const submitToServer = async (values) => {
    try{
      formik.setSubmitting(true)
      const res = await login({username: values.username, password: values.password})
      // {username: richard@rlewis.me, password: 123456}
      res?.isAuthenticated
        ? history.push(forwardLocation)
        : setLoginError(res?.error)
    }
    catch(e){
      setLoginError(e)
    }
  }

  return (
    <div className="login-wrapper">
      <h1>Log In</h1>
      {loginError ? (<span className="login-error">{loginError}</span>) : null}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username
            ? (<span className="form-error">{formik.errors.username}</span>)
            : (null)}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.password} 
          />
          {formik.touched.password && formik.errors.password
            ? (<span className="form-error">{formik.errors.password}</span>)
            : (null)}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login