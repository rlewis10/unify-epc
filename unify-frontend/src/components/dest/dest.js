import React from 'react'

const Dest = ({id, destName, deleteDest}) => {

    return (
        <div className="place">
            <li>{destName}</li>
            <button onClick={() => deleteDest(id)} className="trash-btn"><i className="fas fa-trash">x</i></button>
        </div>
    )
}

export default Dest    