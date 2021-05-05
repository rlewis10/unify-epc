import React, {useContext, useEffect} from 'react'
import Dest from './dest'
import {useDestContext} from '../../context/destContext'
import {useAuthContext} from '../../context/authContext'

const DestList = () => {

    const {dest, getDests, saveDests, deleteDest} = useContext(useDestContext)
    const {getLocalStore} = useContext(useAuthContext)
    let localeUserId = getLocalStore(['userId'])

    const getDestinations = async (userId) => {
        await getDests(userId)
    }
    
    const saveDestinations = async (userId, dests) => {
        await saveDests(userId, dests)
    }
    
    useEffect(() => {
        getDestinations(localeUserId.userId)
    }, [])

    return (
        <div className="dest-container">
            <button onClick={() => getDestinations(localeUserId.userId)}>Reset</button>
            <button onClick={() => saveDestinations(localeUserId.userId, dest)}>Save</button>
                <ul className="dest-list">
                    {Object.keys(dest).map(d => <Dest key={d} id={d} destName={dest[d]['placeLabel']} deleteDest={deleteDest} />)}
                </ul>
        </div>
    )
}

export default DestList
