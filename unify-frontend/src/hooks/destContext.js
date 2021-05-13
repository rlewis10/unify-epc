import React, {useState, createContext} from 'react'
import axios from 'axios'

const useDestContext = createContext()

const DestProvider = (props) => {
  
  const [dests, setDest] = useState({})

  // get destinations from server
  const getDests = async (userId) => {
    try{
      const res = await axios({
        method: 'get', 
        url: `/api/dest/find/userid/${userId}`,
      })
      const dests = res.data
      setDest(dests)
    }
    catch(e){
      console.log(e.message)
    }
  }

  // save destinations from server
  const saveDests = async (userId, dests) => {
    try{
      const res = await axios({
        method: 'post', 
        url: `/api/dest/upsert/userid/${userId}`,
        data: dests
      })
      return {savedDests: true}
    }
    catch(e){
      console.log(e.message)
    }
  }

  const addDest = (destItem) => {
    setDest(prevState => ({ ...prevState, ...destItem}))
  }

  const deleteDest = (destItem) => {
    let {[destItem] : deleted , ...updatedDest} = dests
    setDest(updatedDest)
  }

  return (
    <useDestContext.Provider value={{dests, getDests, addDest, saveDests, deleteDest}}>
        {props.children}
    </useDestContext.Provider>
  )
}

export {useDestContext, DestProvider}