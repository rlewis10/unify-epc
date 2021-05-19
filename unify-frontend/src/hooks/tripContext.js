import React, {useState, createContext} from 'react'
import axios from 'axios'

const useTripContext = createContext()

const TripProvider = (props) => {
  
  const [trips, setTrips] = useState({})

  // get destinations from server
  const getTrips = async (userId) => {
    try{
      const res = await axios({
        method: 'get', 
        url: `/api/trip/find/userid/${userId}`,
      })
      const dests = res.data
      setTrips(dests)
    }
    catch(e){
      console.log(e.message)
    }
  }

  // save destinations from server
  const saveTrips = async (userId, dests) => {
    try{
      const res = await axios({
        method: 'post', 
        url: `/api/trip/upsert/userid/${userId}`,
        data: dests
      })
      return {savedDests: true}
    }
    catch(e){
      console.log(e.message)
    }
  }

  const addTrip = (trip) => {
    setTrips(prevState => ({ ...prevState, ...trip}))
  }

  const deleteTrip = (trip) => {
    let {[trip] : deleted , ...updatedTrip} = trips
    setTrips(updatedTrip)
  }

  return (
    <useTripContext.Provider value={{trips, getTrips, addTrip, saveTrips, deleteTrip}}>
        {props.children}
    </useTripContext.Provider>
  )
}

export {useTripContext, TripProvider}