
import React, { useState } from 'react'

const FormCheckbox = (props) => {

    const {id, name,label, children} = props
    const [isActive, setIsActive] = useState(false)

    const toggleClass = () => {
        setIsActive(!isActive)
    }

    return (
        <div className={`checkbox-button group pointer-events-auto block items-center px-4 py-2 mt-2 text-sm rounded-lg 
            ${isActive
                ? `text-white bg-blue-500 outline-none shadow-outline`
                : `font-semibold text-gray-900 bg-gray-200 hover:text-gray-900 hover:bg-gray-400 `

            }`}>
            <input 
                type="checkbox"
                value={isActive}
                id={id} 
                defaultChecked={isActive}
                onChange={toggleClass}
                onClick={toggleClass}
                className="group-focus hidden"
            />
            <label htmlFor={id}>
                {
                    React.Children.map(children, (child) =>
                    React.cloneElement(child, {
                        className: `${child.props.className} group-focus`
                        })
                    )
                }
            </label>
        </div>
    )
}

export default FormCheckbox