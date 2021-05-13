import React, {useContext, useEffect} from 'react'
import Dest from './dest'
import {useDestContext} from '../../hooks/destContext'
import {useAuthContext} from '../../hooks/authContext'

const DestList = () => {

    const {dests, getDests, saveDests, deleteDest} = useContext(useDestContext)
    const {Auth} = useContext(useAuthContext)
    let userId = Auth.userId

    const getDestinations = async (userId) => {
        await getDests(userId)
    }
    
    const saveDestinations = async (userId, dests) => {
        await saveDests(userId, dests)
    }
    
    useEffect(() => {
        getDestinations(userId)
    }, [])

    return (
        <div className="dest-container">
            <button onClick={() => getDestinations(userId)}>Reset</button>
            <button onClick={() => saveDestinations(userId, dests)}>Save</button>
                <ul className="dest-list">
                    {Object.keys(dests).map(dest => <Dest key={dest} id={dest} destName={dests[dest]['placeLabel']} deleteDest={deleteDest} />)}
                </ul>
        </div>
    )
}

export default DestList
