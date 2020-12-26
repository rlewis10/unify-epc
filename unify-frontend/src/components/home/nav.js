import React from "react"
import {Link} from "react-router-dom"

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/destpicker">Destinations</Link></li>
                <li><Link to="/alerts">Alerts</Link></li>
                <li><Link to="/preferences">Preferences</Link></li>
            </ul>
        </nav>
    )
}

export default Nav