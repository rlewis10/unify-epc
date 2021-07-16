import React from 'react'
import {Link} from 'react-router-dom'

const NavItem = (props) => {
    return (
        <Link to={props.to}>
            <li {...props} className="cursor-pointer block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg hover:text-gray-900 focus:text-white hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline " >
                {props.children}
            </li>
        </Link>
    )
}

export default NavItem