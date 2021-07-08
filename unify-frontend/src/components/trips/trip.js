import React from 'react'

const Trip = (props) => {

    const {id, destName, deleteTrip} = props

    return (
        <div className="place">
            <li>{destName}</li>
            <button>cruise</button>
            <button>beach</button>
            <button>city</button>
            <button>outdoors</button>
            <button onClick={() => deleteTrip(id)} className="trash-btn"><i className="fas fa-trash">x</i></button>
        </div>
    )
}

export default Trip