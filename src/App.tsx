import React, { useState, useEffect } from 'react'
import { Vehicle } from './types/types'
import vehicleService from './services/vehicle.service'
import VehiclesList from './components/vehiclesList'
import Map from './components/map'

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(true) // Состояние для индикации загрузки

  useEffect(() => {
    getVehicles()
  }, [])

  const getVehicles = async () => {
    const data = await vehicleService.get()
    setVehicles(data)
    setLoading(false) // Устанавливаем загрузку как завершенную
  }

  document.addEventListener('keyup', event => {
    if (event.code === 'Escape') setOpen(false)
  })

  const handleChange = (newInfo: Vehicle[]) => {
    setVehicles(newInfo)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='container'>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          {isOpen ? (
            <Map vehicles={vehicles} onClose={handleClose} />
          ) : (
            <VehiclesList
              vehicles={vehicles}
              onChange={handleChange}
              onOpen={handleOpen}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
