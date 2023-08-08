import React, {useMemo} from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import Spinner from './Spinner'
import '../styles/maps.css'

function Map() {
    const {isLoaded} = useLoadScript({googleMapsApiKey: 'AIzaSyD8qpfVRZSZsQfuGZdN8DF9HGo9Xt_NC8U' })

    if(!isLoaded) return <Spinner /> 

  return (
    <GoogleMap zoom={10} center={{lat:44, lng:-80}} mapContainerClassName='map-container'></GoogleMap>
  )
}

export default Map