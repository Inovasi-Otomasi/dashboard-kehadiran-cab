import React from 'react'
import '../styles/maps.css'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import { Icon } from 'leaflet';
import TrayekMapRoute from './TrayekMapRoute';



function TrayekMap() {
  return (
    <div className='container-fluid'>
      <MapContainer center={[-6.402484, 106.794243]} zoom={9} className='leaflet-container'>
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <TrayekMapRoute />
      </MapContainer>
    </div>
    
  )
}

export default TrayekMap