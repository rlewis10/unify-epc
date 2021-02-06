import React from "react"
import './App.css'

import {BrowserRouter as Router,Switch, Route} from "react-router-dom"
import ProtectedRoute from './components/auth/protectedRoute'
import Nav from './components/home/nav'
import Home from './components/home/home'
import Login from './components/auth/login'
import Signup from './components/auth/signup'
import Profile from './components/profile'
import DestPicker from './components/dest/destPicker'
import Alerts from './components/alerts'
import Preferences from './components/preferences'
import { AuthProvider } from "./context/authContext"

const App = () => {
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
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Login}/>
                <Route path="/signup" component={Signup}/>
            </Switch>
          </AuthProvider>
        </main>
      </Router>
    </div>
  )
}

export default App
