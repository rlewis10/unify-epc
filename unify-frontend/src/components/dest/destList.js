import React, {useContext} from 'react'
import Dest from './dest'
import {useDestContext} from '../../context/destContext'

const DestList = () => {

    const {dest, deleteDest} = useContext(useDestContext)

    return (
        <div className="dest-container">
            <ul className="dest-list">
            {Object.keys(dest).map(d => <Dest key={d} id={d} destName={dest[d]['placeLabel']} deleteDest={deleteDest} />)}
            </ul>
        </div>
    )
}

export default DestList
