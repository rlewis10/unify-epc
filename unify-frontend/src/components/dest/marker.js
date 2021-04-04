import {useEffect, useState} from 'react'

const Marker = (props) => {

  const [MarkerProps] = useState(props)

  let markerObj
  let google = window.google

  useEffect(() => {
    createMarker()
    return () => {
      removeMarker()
    }
  },[MarkerProps])

  const createMarker = () => {
    markerObj = new window.google.maps.Marker({
      ...MarkerProps,
      animation: google.maps.Animation.DROP
    })
  }

  const removeMarker = () => {
    markerObj.setMap(null) 
  }
    
  return (null) 
}

export default Marker    