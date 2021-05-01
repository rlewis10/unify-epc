import React from 'react'

const Dest = ({id, destName, deleteDest}) => {

    return (
        <div className="place">
            <li>{destName}</li>
            <input type="date" name="date"></input>
            <input type="date" name="date"></input>
            <button>cruise</button>
            <button>beach</button>
            <button>city</button>
            <button>countryside</button>
            <button>tour</button>
            <button onClick={() => deleteDest(id)} className="trash-btn"><i className="fas fa-trash">x</i></button>
        </div>
    )
}

export default Dest    