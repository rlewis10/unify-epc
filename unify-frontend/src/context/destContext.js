import React, {useState, createContext} from 'react'

const useDestContext = createContext()

const DestProvider = (props) => {
  const [dest, setDest] = useState({})

  const addDest = (destItem) => {
    setDest(prevState => ({ ...prevState, ...destItem}))
  }

  const deleteDest = (destItem) => {
    let {[destItem] : deleted , ...updatedDest} = dest
    setDest(updatedDest)
  }

  return (
    <useDestContext.Provider value={{dest, addDest, deleteDest}}>
        {props.children}
    </useDestContext.Provider>
  )
}

export {useDestContext, DestProvider}