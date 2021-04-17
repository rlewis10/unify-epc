import React, {useState, useContext, useEffect} from "react"
import './App.css'
import {useAuthContext} from './context/authContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

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
  const {verifyToken} = useContext(useAuthContext)
  const [LocalAuth, setLocalAuth] = useState({})

  useEffect(() => {
    const checkAuth = async () => {
      let res = await verifyToken()
      setLocalAuth(res)
    }
    checkAuth()
  }, [])

  return (
    <div className='App'>
        <Router>
          <Nav/>
          <main>
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <ProtectedRoute exact path='/profile' component={Profile} isAuthenticated={LocalAuth}/>
                  <ProtectedRoute exact path='/destpicker' component={DestPicker} isAuthenticated={LocalAuth}/>
                  <ProtectedRoute exact path='/alerts' component={Alerts} isAuthenticated={LocalAuth}/>
                  <ProtectedRoute exact path='/preferences' component={Preferences} isAuthenticated={LocalAuth}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/logout" component={Login}/>
                  <Route exact path="/signup" component={Signup}/>
              </Switch>
          </main>
        </Router>
    </div>
  )
}

export default App
