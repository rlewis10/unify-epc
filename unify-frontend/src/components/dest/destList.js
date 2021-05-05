import React, {useContext, useEffect} from 'react'
import Dest from './dest'
import {useDestContext} from '../../context/destContext'
import {useAuthContext} from '../../context/authContext'

const DestList = () => {

    const {dests, getDests, saveDests, deleteDest} = useContext(useDestContext)
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
            <button onClick={() => saveDestinations(localeUserId.userId, dests)}>Save</button>
                <ul className="dest-list">
                    {Object.keys(dests).map(dest => <Dest key={dest} id={dest} destName={dests[dest]['placeLabel']} deleteDest={deleteDest} />)}
                </ul>
        </div>
    )
}

export default DestList
