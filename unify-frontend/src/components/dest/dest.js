import React, { useState } from 'react'
import { DateRangePicker} from 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';

const Dest = ({id, destName, deleteDest}) => {

    const [date, setDate] = useState({
        startDate: '',
        endDate: ''
    })

    return (
        <div className="place">
            <li>{destName}</li>
            {/* <DateRangePicker
                startDate={null}// momentPropTypes.momentObj or null,
                startDateId='1' // PropTypes.string.isRequired,
                endDate={null} // momentPropTypes.momentObj or null,
                endDateId='2' // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => setDate({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={date.startDate} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => setDate({ focusedInput })} // PropTypes.func.isRequired,
            /> */}
            <button>cruise</button>
            <button>beach</button>
            <button>city</button>
            <button>outdoors</button>
            <button onClick={() => deleteDest(id)} className="trash-btn"><i className="fas fa-trash">x</i></button>
        </div>
    )
}

export default Dest    