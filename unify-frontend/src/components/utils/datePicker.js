import React, {useState} from 'react'
import DatePicker, {setDefaultLocale} from 'react-datepicker'
setDefaultLocale('en')


const NavItem = (props) => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date().setMonth(startDate.getMonth() + 1))

    return (
        <div className="bg-gray-100">
            {props.label || null}
            <div className="flex space-x-4">
                <div className="relative">
                    <DatePicker
                        locale="en"
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