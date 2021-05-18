import React from 'react'
import {DestProvider} from '../../hooks/destContext'
import Search from './search'
import DestList from './destList'
import Map from './map'

const DestPicker = () => {
  return (
    <DestProvider>
      <div>
        <h1>Trip Planner</h1>
        <p>Select you desired Destinations(s) enabling us to send you the best and lastest offers!</p>
          <Search/>
          <DestList/>
          <Map/>
      </div>
    </DestProvider>
  )
}

export default DestPicker