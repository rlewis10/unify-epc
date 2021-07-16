import React, {useState, useContext} from 'react'
import Script from 'react-load-script'
import {useTripContext} from '../../hooks/tripContext'

// setup environement variables
require('dotenv').config({path: __dirname + '/.env'})

const Search = () => {

  const {addTrip} = useContext(useTripContext)
  const [inputTxt, setinputTxt] = useState('')
  
  let autoComplete
  let placePhoto
  let scriptTag = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqMol50K6M9e8xVKpBacpSl5sDHHbg5J4&libraries=places`

  const inputTxtHandler = (e) => {
    setinputTxt(e.target.value)
  }

  const scriptLoadHandler = () => {
    const google = window.google
    getPlacesAutocomplete(google)
  }

  const getPlacesAutocomplete = (google) => {
    const field = document.getElementById('autocomplete') 
    const options = {types: ['(cities)']}
    autoComplete = new google.maps.places.Autocomplete(field, options)
    // Options for fields to select from the Google API
    autoComplete.setFields(['place_id', 'formatted_address','address_components','geometry','url'])
    // Fire Event when a suggested name is selected
    autoComplete.addListener('place_changed', placeAutocompleteHandler)
  }
  
  const placeAutocompleteHandler = () => {
    const placeObject = autoComplete.getPlace() 
    // Check if address is valid
    if (typeof placeObject.address_components !== 'undefined') {
      // Set State 
      addTrip({
        [placeObject.place_id]: {
          placeLabel: placeObject.formatted_address,
          url: placeObject.url,
          city: placeObject.address_components[0].long_name,
          country: placeObject.address_components[placeObject.address_components.length -1].long_name,
          position: {
            lat: placeObject.geometry.location.lat(),
            lng: placeObject.geometry.location.lng()
          }
        }
      })
      setinputTxt('') // Empty destination input txt on selection
    }
  }

  return (
    <div>
      <Script url={scriptTag} onLoad={scriptLoadHandler}/>
      <label>New Trip: 
        <input 
          id="autocomplete" 
          placeholder="Where you going?..."  
          value={inputTxt} 
          onChange={inputTxtHandler}
          className="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </label>
    </div>
  )
}

export default Search
