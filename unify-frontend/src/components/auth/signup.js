import React, {useState, useContext} from 'react'
import * as yup from 'yup'  
import {useFormik} from 'formik'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from '../../hooks/authContext'
import getQueryParams from '../../hooks/useQueryParams'
import Field from '../../utils/formField'

const Signup = (props) => {

  const {signup} = useContext(useAuthContext)
  const [forwardLocation] = useState('/home')
  const [signupError, setSignupError] = useState(null)
  const history = useHistory()
  let urlParams = getQueryParams(props.location.search)

  const submitToServer = async (user) => {
    try{
      formik.setSubmitting(true)
      if(user.a_password !== '') {return null} // honeypot -> if text in field do not send to server. 
      const res = await signup(user)

      res?.isAuthenticated
      ? history.push(forwardLocation) //change to confirmation page
      : setSignupError(res?.error)
    }
    catch(e){
      setSignupError(e)
    }
  }

  const checkEmail = async (email) => {
    try{
      const res = await axios({
        method: 'get',
        url: `/api/user/find/checkemail/${email}`,
      })
      return res?.data.emailNonExistent
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
      terms: null,
      accountId: urlParams?.accountId || '1',
      a_password: ''
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
          <Field 
            type="text" 
            name="firstName"
            label="First Name:"
            formik={formik}
          />
          <Field 
            type="text"
            name="lastName" 
            label="Last Name:"
            formik={formik} 
          />
          <Field 
            type="email" 
            name="email"
            label="Email" 
            formik={formik} 
          />
          <Field 
            type="password" 
            name="password"
            label="Password:" 
            formik={formik} 
          />
          <Field 
            type="password" 
            name="conPassword"
            label="Confirm Password:" 
            formik={formik} 
          />

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
          id="a_password"
          name="a_password" 
          autoComplete="off"
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.a_password}
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