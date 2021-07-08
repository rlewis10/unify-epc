import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../hooks/authContext'
import * as yup from 'yup'  
import {useFormik, Form, FormikProvider} from 'formik'

const Login = (props) => {

  const {login} = useContext(useAuthContext)
  const [forwardLocation] = useState(props.location.state.referrer)
  const [loginError, setLoginError] = useState(null)
  const history = useHistory()

  const validationSchema = yup.object({
    email: yup
      .string('Enter a email')
      .required('Email is required'),
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
      const res = await login({email: values.email, password: values.password})
      // {email: richard@rlewis.me, password: 123456}
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

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email
              ? (<span className="form-error">{formik.errors.email}</span>)
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
        </Form>
      </FormikProvider>
    </div>
  )
}

export default Login