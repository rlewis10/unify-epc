import React, {useContext} from 'react'
import {Route, Redirect } from 'react-router-dom'
import {useAuthContext} from '../../context/authContext'

const ProtectedRoute = (props) => {

    const {auth} = useContext(useAuthContext)
    return (
        auth.isAuthenticated 
            ? (<Route {...props} />) 
            : (<Redirect from={props.path} to={{ pathname: '/login', state: { referrer: props.path }}} />)
    )
}

export default ProtectedRoute