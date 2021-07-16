import React from 'react'

const Button = (props) => {
    return (
        <button {...props} className="group cursor-pointer block items-center px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:text-gray-900 hover:bg-gray-400 focus:text-white focus:bg-blue-500 focus:outline-none focus:shadow-outline">
            {props.children}
        </button>
    )
}

export default Button