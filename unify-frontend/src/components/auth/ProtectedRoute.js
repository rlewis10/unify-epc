import React, {useContext} from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useAuthContext} from '../../context/authContext'

const ProtectedRoute = (props) => {

    const {Auth} = useContext(useAuthContext)
    return (
        Auth.isAuthenticated
            ? (<Route {...props} />) 
            : (<Redirect to={{ pathname: '/login', state: { referrer: props.path }}} />)
    )
}

export default ProtectedRoute