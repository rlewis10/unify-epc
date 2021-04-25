import React, {useContext, useEffect} from 'react'
import Dest from './dest'
import {useDestContext} from '../../context/destContext'
import {useAuthContext} from '../../context/authContext'

const DestList = () => {

    const {dest, getDests, deleteDest} = useContext(useDestContext)
    const {getLocalStore} = useContext(useAuthContext)
    let localStoreKey = ['userId']

    const getDestinations = async (userId) => {
        await getDests(userId)
      }
    
    useEffect(() => {
        let localeUserId = getLocalStore(localStoreKey)
        getDestinations(localeUserId.userId)
    }, [])

    return (
        <div className="dest-container">
            <ul className="dest-list">
            {Object.keys(dest).map(d => <Dest key={d} id={d} destName={dest[d]['placeLabel']} deleteDest={deleteDest} />)}
            </ul>
        </div>
    )
}

export default DestList
