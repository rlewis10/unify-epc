import React, {useState, useContext} from 'react'
import * as yup from 'yup'  
import {useFormik} from 'formik'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../hooks/authContext'
import getQueryParams from '../../hooks/useQueryParams'

const Signup = (props) => {

  const {signup} = useContext(useAuthContext)
  const [forwardLocation] = useState('/home')
  const [signupError, setSignupError] = useState(null)
  const history = useHistory()
  let urlParams = getQueryParams(props.location.search)

  const submitToServer = async (values) => {
    try{
      alert(formik.values)
    }
    catch(e){
      console.log(e)
    }
  }

  const checkEmail = async (email) => {
    try{
      const res = await axios({
        method: 'get',
        url: `/api/user/find/checkemail/${email}`,
      })
      return res?.data.usernameNonExistent
    }
    catch(e){
      console.log(e)
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
      .required('Email is required')
      .test('checkEmail', 'Email already exists', async (value) => {
        return await checkEmail(value)
    }),
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
      }),
    terms: yup
      .boolean()
      .required()
      .oneOf([true],'Please accept the terms')
  })

  const formik = useFormik({
    initialValues: {
      firstName: urlParams?.firstName || '', 
      lastName: urlParams?.lastName || '', 
      email: urlParams?.email || '', 
      password: '',
      conPassword: '',
      terms: false,
      accountId: ''
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
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
          <input 
            type="checkbox" 
            id="terms" 
            name="terms" 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            value={formik.values.terms}
          />
          <label htmlFor="terms">I have read and agree to the <span></span>
            <a href="http://www.unifynow.co.uk/wp-content/uploads/2020/07/TCs.pdf">Terms of Service</a>
          </label>
          {formik.touched.terms && formik.errors.terms
            ? (<span className="form-error">{formik.errors.terms}</span>)
            : (null)}
        </div>

        <div>
        <input 
          type="hidden" 
          id="accountId"
          name="accountId" 
          autoComplete="off" 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.accountId}
        />
        </div>

        <div className='form-honeypot'>
        <input 
          type="text" 
          name="a_password" 
          autoComplete="off"
        />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default Signup