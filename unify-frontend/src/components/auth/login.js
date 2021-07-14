import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../hooks/authContext'
import * as yup from 'yup'  
import {useFormik, Form, FormikProvider} from 'formik'
import Field from '../utils/formField'
import Button from '../utils/button'
import Date from '../utils/datePicker'

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
      {loginError ? (<span className="mt-2 text-red-600">{loginError}</span>) : null}

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
            <Field 
              type="text" 
              name="email" 
              label="Email:"
              formik={formik}
            />
            <Field 
              type="password" 
              name="password" 
              label="Password:"
              formik={formik}
            />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  )
}

export default Login