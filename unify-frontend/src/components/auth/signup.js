import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../context/authContext'
import * as yup from 'yup'  
import {useFormik} from 'formik'

const Signup = () => {

  const {signup} = useContext(useAuthContext)
  const [forwardLocation] = useState('/home')
  const [signupError, setSignupError] = useState(null)
  const history = useHistory()

  const validationSchema = yup.object({})

  const formik = useFormik({
    initialValues: {
      firstname: '', 
      lastname:'', 
      email: '' , 
      username: '', 
      password: '',
      conPassword: ''
    },
    validationSchema : validationSchema,
    onSubmit : (values) => {submitToServer(values)}
  })

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

  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      {signupError ? (<span> {signupError} </span>) : null}

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" onChange={formik.handleChange} values={formik.values.firstname}/>
          {formik.touched.firstName && formik.errors.firstName
            ? (<span className="error">{formik.errors.firstName}</span>)
            : (null)}
        </div>
        
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" onChange={formik.handleChange} values={formik.values.lastname}/>
          {formik.touched.lastName && formik.errors.lastName
            ? (<span className="error">{formik.errors.lastName}</span>)
            : (null)}
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={formik.handleChange} values={formik.values.email}/>
          {formik.touched.email && formik.errors.email
            ? (<span className="error">{formik.errors.email}</span>)
            : (null)}
        </div>
        
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={formik.handleChange} values={formik.values.username}/>
          {formik.touched.username && formik.errors.username
            ? (<span className="error">{formik.errors.username}</span>)
            : (null)}
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={formik.handleChange} values={formik.values.password}/>
          {formik.touched.password && formik.errors.password
            ? (<span className="error">{formik.errors.password}</span>)
            : (null)}
        </div>

        <div>
          <label htmlFor="conPassword">Confirm Password</label>
          <input type="password" name="conPassword" onChange={formik.handleChange} values={formik.values.conPassword}/>
          {formik.touched.conPassword && formik.errors.conPassword
            ? (<span className="error">{formik.errors.conPassword}</span>)
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