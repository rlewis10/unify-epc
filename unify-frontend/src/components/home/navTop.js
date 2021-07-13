import React from 'react'
import NavItem from '../../utils/navItem'

const NavTop = () => {
    return (
        <nav>
            <ul className="flex flex-row p-1 bg-white shadow-xs mr-8 hidden md:flex">
                <NavItem to="/">Settings</NavItem>
                <NavItem to="/">Profile</NavItem>
                <NavItem to="/">Login/Logout</NavItem>
            </ul>
        </nav>
    )
}

export default NavTop