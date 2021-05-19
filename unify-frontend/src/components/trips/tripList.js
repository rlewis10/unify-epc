import React, {useContext, useEffect} from 'react'
import Trip from './trip'
import {useTripContext} from '../../hooks/tripContext'
import {useAuthContext} from '../../hooks/authContext'

const TripList = () => {

    const {trips, getTrips, saveTrips, deleteTrip} = useContext(useTripContext)
    const {Auth} = useContext(useAuthContext)
    let userId = Auth.userId

    const getTripDestinations = async (userId) => {
        await getTrips(userId)
    }
    
    const saveTripDestinations = async (userId, dests) => {
        await saveTrips(userId, dests)
    }
    
    useEffect(() => {
        getTripDestinations(userId)
    }, [])

    return (
        <div className="dest-container">
            <button onClick={() => getTripDestinations(userId)}>Reset</button>
            <button onClick={() => saveTripDestinations(userId, trips)}>Save</button>
                <ul className="dest-list">
                    {Object.keys(trips).map(trip => <Trip key={trip} id={trip} destName={trips[trip]['placeLabel']} deleteTrip={deleteTrip} />)}
                </ul>
        </div>
    )
}

export default TripList
