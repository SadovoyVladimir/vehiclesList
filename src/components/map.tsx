import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { Vehicle } from '../types/types'
import 'leaflet/dist/leaflet.css'

interface props {
  vehicles: Vehicle[]
  onClose: () => void
}

const Map: React.FC<props> = ({ vehicles, onClose }) => {
  const customIcon = new Icon({
    iconUrl: require('../img/marker-icon.png'),
    iconSize: [38, 38],
  })

  return (
    <MapContainer
      center={[vehicles[2].latitude, vehicles[1].longitude]}
      zoom={13}>
      <div className='close-button'>
        <button onClick={onClose}>&times;</button>
      </div>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {vehicles.map((vehicle: Vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.latitude, vehicle.longitude]}
          icon={customIcon}>
          <Popup>
            {vehicle.name} {vehicle.model}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map
