import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../hooks/authContext'
import * as yup from 'yup'  
import {useFormik} from 'formik'
import queryString from 'query-string'

const Signup = (props) => {

  const {signup} = useContext(useAuthContext)
  const [forwardLocation] = useState('/home')
  const [signupError, setSignupError] = useState(null)
  const history = useHistory()

  useEffect(() => {
    queryParams()
  },[])

  const queryParams = () => {
    let params = queryString.parse(props.location.search)
    if(Object.keys(params).length === 0) return
    return params
  }

  const submitToServer = async (values) => {
    try{
      formik.setSubmitting(true)
      const res = await signup({username: values.username, password: values.password})
      res?.isAuthenticated
        ? history.push(forwardLocation)
        : setSignupError('Unable to complete Signup')
    }
    catch(e){
      console.log(e)
    }
  }

  const checkUsername = async (username) => {
    try{
      const res = null
      if(res) return true
      return false
    }
    catch(e){
      return false
    }
  }

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required('First Name is required'),
    lastName: yup
      .string()
      .required('Last Name is required'),
    email: yup
      .string()
      .email()
      .required('Email is required'),
    username: yup
      .string()
      .min(8, 'Username must be at least 8 characters')
      .required('Username is required')
      .test(
        'checkUsername',
        'Username already exists, please choose another',
         async (value) => checkUsername(value)
      ),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must contain a minimum eight characters, at least one letter, one number and one special character'
      ),
    conPassword: yup
      .string()
      .required('Confirm password')
      .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      })
  })

  const formik = useFormik({
    initialValues: {
      firstName: queryParams()?.firstName || '', 
      lastName: queryParams()?.lastName || '', 
      email: queryParams()?.email || '', 
      username: queryParams()?.username || '', 
      password: '',
      conPassword: ''
    },
    enableReinitialize: true,
    validationSchema : validationSchema,
    onSubmit : (values) => {submitToServer(values)}
  })

  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      {signupError ? (<span> {signupError} </span>) : null}

      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName"
            name="firstName" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.firstName} 
          />
          {formik.touched.firstName && formik.errors.firstName
            ? (<span className="form-error">{formik.errors.firstName}</span>)
            : (null)}
        </div>
        
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text"
            id="lastName"
            name="lastName" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName
            ? (<span className="form-error">{formik.errors.lastName}</span>)
            : (null)}
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
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
          <label htmlFor="conPassword">Confirm Password</label>
          <input 
            type="password" 
            id="conPassword"
            name="conPassword" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.conPassword}
          />
          {formik.touched.conPassword && formik.errors.conPassword
            ? (<span className="form-error">{formik.errors.conPassword}</span>)
            : (null)}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default Signup