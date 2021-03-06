import React, {useContext, useEffect} from "react"
import {useAuthContext} from './hooks/authContext'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'

import ProtectedRoute from './components/auth/protectedRoute'
import Nav from './components/nav/navSide'
import Header from './components/nav/navTop'
import Home from './components/home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Profile from './components/profile'
import TripPicker from './components/trips/tripPicker'
import Alerts from './components/alerts'
import Preferences from './components/preferences'

const App = () => {
  const {verifyToken} = useContext(useAuthContext)

  const checkAuth = async () => {
    await verifyToken()
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
        <BrowserRouter>
          <Nav/>
          <div className="w-screen min-h-screen flex flex-col">
            <Header className="bg-gray-200 p-8 h-24" />
            <main className="bg-gray-100 p-8 flex-grow rounded-t-lg">
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <ProtectedRoute exact path='/profile' component={Profile}/>
                  <ProtectedRoute exact path='/trips' component={TripPicker}/>
                  <ProtectedRoute exact path='/alerts' component={Alerts}/>
                  <ProtectedRoute exact path='/preferences' component={Preferences}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/logout" component={Login}/>
                  <Route exact path="/signup" component={Signup}/>
              </Switch>
            </main>
            <div className="bg-gray-200 p-8 h-32 rounded-b-lg">Footer</div>
          </div>
        </BrowserRouter>
    </div>
  )
}

export default App
