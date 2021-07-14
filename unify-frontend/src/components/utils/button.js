import React from 'react'

const Button = (props) => {
    return (
        <button class="cursor-pointer block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg hover:text-gray-900 focus:text-white hover:bg-gray-400 focus:bg-blue-500 focus:outline-none focus:shadow-outline inline-flex items-center">
            {props.children}
        </button>
    )
}

export default Button