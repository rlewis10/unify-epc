import React, {useContext, useEffect} from 'react'
import Trip from './trip'
import {useTripContext} from '../../hooks/tripContext'
import {useAuthContext} from '../../hooks/authContext'
import Button from '../utils/button'

const TripList = () => {

    const {trips, getTrips, saveTrips, addTrip} = useContext(useTripContext)
    const {Auth} = useContext(useAuthContext)
    let userId = Auth.userId

    const getTripDestinations = async (userId) => {
        await getTrips(userId)
    }
    
    const saveTripDestinations = async (userId, trips) => {
        await saveTrips(userId, trips)
    }

    const updateTripDetails = async (trip) => {
        await addTrip(trip)
    }
    
    useEffect(() => {
        getTripDestinations(userId)
    }, [])

    return (
        <div className="trip-container">
            <Button onClick={() => getTripDestinations(userId)}>Reset</Button>
            <Button onClick={() => saveTripDestinations(userId, trips)}>Save</Button>
                <div className="trip-list">
                    {Object.keys(trips).map(trip => 
                        <Trip key={trip} trip={trips[trip]} />
                    )}
                </div>
        </div>
    )
}

export default TripList
