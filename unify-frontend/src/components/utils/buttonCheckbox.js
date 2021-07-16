
import React, { useState } from 'react'

const FormCheckbox = (props) => {

    const {id, name,label} = props
    const [isActive, setIsActive] = useState(false)

    const toggleClass = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="checkbox-button">
            <input 
                type="checkbox"
                value={name}
                id={id} 
                defaultChecked={isActive}
                onClick={toggleClass}
                className="hidden"
            />
            <label htmlFor={id}>
                {props.children}
            </label>
        </div>
    )
}

export default FormCheckbox