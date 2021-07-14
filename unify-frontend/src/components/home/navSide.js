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

            <nav className="flex flex-shrink-0 md:block px-4 p-4 md:overflow-y-auto">
                <button
                    type="button"
                    id="hamburgerbtn"
                    className="cursor-pointer px-3 py-1 border border-solid border-transparent bg-transparent md:hidden outline-none"
                    onClick={handleClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                </button>

                <ul className={`flex flex-col text-right transform ${isOpen ? 'translate-x-0 ease-in transition-medium' : 'translate-x-full ease-out transition-medium md:translate-x-0 hidden'} md:block md:text-left `}>
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