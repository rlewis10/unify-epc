import React, {useState, useContext} from 'react'
import Script from 'react-load-script'
import {useDestContext} from '../../hooks/destContext'

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

const Search = () => {

  const {addDest} = useContext(useDestContext)
  const [inputTxt, setinputTxt] = useState('')
  
  let autoComplete
  let scriptTag = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqMol50K6M9e8xVKpBacpSl5sDHHbg5J4&libraries=places`

  const inputTxtHandler = (e) => {
    setinputTxt(e.target.value)
  }

  const scriptLoadHandler = () => {
    const google = window.google
    const field = document.getElementById('autocomplete') 
    const options = {types: ['(cities)']}
    autoComplete = new google.maps.places.Autocomplete(field, options)
    // Options for fields to select from the Google API
    autoComplete.setFields(['place_id', 'formatted_address','address_components','geometry','url'])
    // Fire Event when a suggested name is selected
    autoComplete.addListener('place_changed', addDestHandler)
  }
  
  const addDestHandler = () => {
    const addressObject = autoComplete.getPlace() 
    // Check if address is valid
    if (typeof addressObject.address_components !== 'undefined') {
      // Set State 
      addDest(prevDests => (
        {
          ...prevDests, 
          [addressObject.place_id]: {
            placeLabel: addressObject.formatted_address,
            url: addressObject.url,
            city: addressObject.address_components[0].long_name,
            country: addressObject.address_components[addressObject.address_components.length -1].long_name,
            position: {
              lat: addressObject.geometry.location.lat(),
              lng: addressObject.geometry.location.lng()
            }
          }
        })
      )
      setinputTxt('') // Empty destination input txt on selection
    }
  }

  return (
    <div>
      <Script url={scriptTag} onLoad={scriptLoadHandler}/>
      <label>Destinations: 
        <input id="autocomplete" placeholder="Where you going?..."  value={inputTxt} onChange={inputTxtHandler}/>
      </label>
    </div>
  )
}

export default Search
