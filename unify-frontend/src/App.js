import React, {useEffect, useContext} from "react"
import './App.css'

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {useAuthContext, AuthProvider } from "./context/authContext"
import ProtectedRoute from './components/auth/protectedRoute'
import Nav from './components/home/navSide'
import Home from './components/home/home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Profile from './components/profile'
import DestPicker from './components/dest/destPicker'
import Alerts from './components/alerts'
import Preferences from './components/preferences'

const App = () => {

  const Auth = useContext(useAuthContext)

  // useEffect(() => {
  //   // verfiy token
  //   const loggedInUser = localStorage.getItem("user")
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser)
  //   }
  // }, [])

  return (
    <div className='App'>
      <Router>
        <Nav/>
        <main>
          <AuthProvider>
            <Switch>
                <Route exact path='/' component={Home}/>
                <ProtectedRoute exact path='/profile' component={Profile}/>
                <ProtectedRoute exact path='/destpicker' component={DestPicker} />
                <ProtectedRoute exact path='/alerts' component={Alerts} />
                <ProtectedRoute exact path='/preferences' component={Preferences} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/logout" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
            </Switch>
          </AuthProvider>
        </main>
      </Router>
    </div>
  )
}

export default App
