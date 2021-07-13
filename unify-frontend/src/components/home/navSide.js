import React from 'react'
import NavItem from '../../utils/navItem'


const NavSide = () => {
    return (
        <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">

            <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                <a href="/" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">unify</a>
                <button class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" />
            </div>

            <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                <ul>
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="/profile">Profile</NavItem>
                    <NavItem to="/trips">Trips</NavItem>
                    <NavItem to="/alerts">Alerts</NavItem>
                    <NavItem to="/preferences">Travel Preferences</NavItem>
                </ul>
            </nav>
        </div>
    )
}

export default NavSide