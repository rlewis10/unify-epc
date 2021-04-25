import React, {useState, createContext} from 'react'
import axios from 'axios'

const useDestContext = createContext()

const DestProvider = (props) => {
  
  const [dest, setDest] = useState({})

  // get destinations from server
  const getDests = async (userId) => {
    try{
      const res = await axios({
        method: 'get', 
        url: '/api/dest/',
      })
      const {} = res.data
      setDest(prevState => ({...prevState, }))
      return res.data
    }
    catch(e){
    }
  }

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