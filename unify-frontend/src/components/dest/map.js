/*global google*/
import React, {useState, useContext} from 'react'
import Script from 'react-load-script'
import {useDestContext} from '../../context/destContext'
import Marker from './marker'

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

const Map = () => {

    console.log(process.env.GMAPS_KEY)
    const {dest} = useContext(useDestContext)

    const [Bounds, setBounds] = useState()
    const [gMap, setgMap] = useState()
    const [Options, setOptions] = useState({
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

    const setMapViewport = (position) => {
        let viewport = Bounds.extend(position)
        gMap.fitBounds(viewport)
    }
    
    return (
        <div>
            <Script url={scriptTag} onLoad={loadGapiMapScript} />
            <div id="mapContainer" style={{height: '600px', width: '100%'}}>
                {Object.keys(dest).map(m => {
                    setMapViewport(dest[m]['position'])
                    return <Marker key={m} id={m} map={gMap} title={dest[m]['placeLabel']} position={dest[m]['position']} />})}
            </div>
        </div>
    )
}

export default Map