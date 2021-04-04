import React from "react"
import {Link} from "react-router-dom"

const NavTop = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Settings</Link></li>
                <li><Link to="/">Profile</Link></li>
                <li><Link to="/">Login/Logout</Link></li>
            </ul>
        </nav>
    )
}

export default NavTop