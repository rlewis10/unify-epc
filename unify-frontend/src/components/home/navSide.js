import React, {useState} from 'react'
import NavItem from '../../utils/navItem'

const NavSide = () => {

    const [isOpen, setisOpen] = useState(false)

    function handleClick() {
        setisOpen(!isOpen)
      }

    return (
        <div className="flex flex-row justify-between md:flex-col md:justify-start w-full md:w-64 flex-shrink-0">

            <div className="flex flex-shrink-0 px-8 py-4 items-center ">
                <a href="/" className="text-lg font-semibold tracking-widest uppercase rounded-lg">unify</a>
            </div>

            <nav className="flex flex-col flex-shrink-0 md:block px-4 md:overflow-y-auto">
                <button
                    type="button"
                    id="hamburgerbtn"
                    className="cursor-pointer px-3 py-4 border border-solid border-transparent bg-transparent md:hidden outline-none"
                    onClick={handleClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                </button>

                <ul className={`flex flex-col text-right cursor-pointer py-4 transform ${isOpen ? 'translate-x-0 ease-in transition-medium' : 'translate-x-full ease-out transition-medium md:translate-x-0 hidden'} md:block md:text-left `}>
                    <NavItem to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                        <p>Home</p>
                    </NavItem>
                    <NavItem to="/trips">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                        <p>Trips</p>
                    </NavItem>
                    <NavItem to="/alerts">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <p>Alerts</p>
                    </NavItem>
                    <NavItem to="/preferences">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                        <p>Travel Preferences</p>
                    </NavItem>
                </ul>
            </nav>
        </div>
    )
}

export default NavSide