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
      animation: google.maps.Animation.DROP,
    })
    markerObj.setMap(MarkerProps.map)
    markerObj.addListener("click", markerBounce)
    setMapViewport(MarkerProps.position)
  }
  
  const removeMarker = () => {
    markerObj.setMap(null)
  }

  const setMapViewport = (position) => {
    let viewport = MarkerProps.bounds.extend(position)
    MarkerProps.map.fitBounds(viewport)
}

  const markerBounce = () => {
    if (markerObj.getAnimation() !== null) {
      markerObj.setAnimation(null)
    } else {
      markerObj.setAnimation(google.maps.Animation.BOUNCE)
    }
  }
    
  return (null) 
}

export default Marker    