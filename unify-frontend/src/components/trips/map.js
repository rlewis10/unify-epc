import React, {useState, useContext} from 'react'
import Script from 'react-load-script'
import {useTripContext} from '../../hooks/tripContext'
import Marker from './marker'

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

const Map = () => {
    const {trips} = useContext(useTripContext)
    const [Bounds, setBounds] = useState()
    const [gMap, setgMap] = useState()
    const [Options] = useState({
        center: { lat: 25, lng: 0 },
        disableDefaultUI: true,
        zoom: 2.75,
        minZoom: 2, 
        maxZoom: 5
      })

    let scriptTag = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqMol50K6M9e8xVKpBacpSl5sDHHbg5J4&libraries=places`
    
    const loadGapiMapScript = () => {
        const mapContainer = document.getElementById('mapContainer') 
        setgMap(new window.google.maps.Map(mapContainer, Options))
        setBounds(new window.google.maps.LatLngBounds())
    }
    
    return (
        <div>
            <Script url={scriptTag} onLoad={loadGapiMapScript} />
            <div id="mapContainer" className="rounded-lg" style={{height: '600px', width: '100%'}}>
                {Object.keys(trips).map(m => {
                    if(Bounds === undefined) return null
                    return <Marker key={m} id={m} map={gMap} bounds={Bounds} title={trips[m]['placeLabel']} position={trips[m]['position']} />
                })
                }
            </div>
        </div>
    )
}

export default Map