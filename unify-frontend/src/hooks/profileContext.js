import React, {useState, createContext} from 'react'

const useProfileContext = createContext()

const ProfileProvider = (props) => {
  const [Profile, setProfile] = useState({})

  return (
    <useProfileContext.Provider value={{Profile, setProfile}}>
        {props.children}
    </useProfileContext.Provider>
  )
}

export {useProfileContext, ProfileProvider}