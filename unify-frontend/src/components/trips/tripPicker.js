import React from 'react'
import {TripProvider} from '../../hooks/tripContext'
import Search from './search'
import TripList from './tripList'
import Map from './map'

const TripPicker = () => {
  return (
    <TripProvider>
      <div>
        <h1>Trip Planner</h1>
        <p>Select you desired Destinations(s) enabling us to send you the best and lastest offers!</p>
          <Search />
          <TripList />
          <Map />
      </div>
    </TripProvider>
  )
}

export default TripPicker