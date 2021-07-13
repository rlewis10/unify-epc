import React from "react"
import {Link} from "react-router-dom"

const NavTop = () => {
    return (
        <nav className="flex flex-row p-1 justify-between bg-white shadow-xs">
            <ul className="flex mr-8 hidden md:flex">
                <li><Link to="/">Settings</Link></li>
                <li><Link to="/">Profile</Link></li>
                <li><Link to="/">Login/Logout</Link></li>
            </ul>
        </nav>
    )
}

export default NavTop