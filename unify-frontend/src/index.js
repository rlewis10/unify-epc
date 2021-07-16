import React from 'react'
import ReactDOM from 'react-dom'
import "./styles/tailwind.generated.css"
import App from './App'
import reportWebVitals from './reportWebVitals'
import {AuthProvider} from './hooks/authContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
