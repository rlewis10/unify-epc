import React, {useState} from 'react'
import DatePicker, {setDefaultLocale} from 'react-datepicker'
setDefaultLocale('en')


const NavItem = (props) => {

    const [startDate, setStartDate] = useState(props.startDate)
    const [endDate, setEndDate] = useState(props.endDate)
    
    return (
        <div id="datePicker">
            {props.label}
            <div className="flex space-x-4">
                <div className="relative">
                    <DatePicker
                        locale="en"
                        placeholderText="From"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        nextMonthButtonLabel=">"
                        previousMonthButtonLabel="<"
                    />
                </div>
                <div className="relative">
                    <DatePicker
                        locale="en"
                        placeholderText="To"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        nextMonthButtonLabel=">"
                        previousMonthButtonLabel="<"
                    />
                </div>
            </div>
        </div>
    )
}

export default NavItem