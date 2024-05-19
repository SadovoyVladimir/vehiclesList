import { SetStateAction, useState } from 'react'
import { Vehicle } from '../types/types'
import EditModal from './editModal'

interface props {
  vehicles: Vehicle[]
  onChange: (newInfo: Vehicle[]) => void
  onOpen: () => void
}

const VehiclesList: React.FC<props> = ({ vehicles, onChange, onOpen }) => {
  const [sortBy, setSortBy] = useState<keyof Vehicle | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('')

  const handleSort = (field: SetStateAction<keyof Vehicle | null>) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
  }

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (sortBy) {
      const sortedResult =
        Number(a[sortBy as keyof Vehicle]) - Number(b[sortBy as keyof Vehicle])
      return sortDirection === 'asc' ? sortedResult : -sortedResult
    }
    return 0
  })

  const handleEdit = (id: number, newValue: Partial<Vehicle>) => {
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === id ? (vehicle = { ...vehicle, ...newValue }) : vehicle
    )
    onChange(updatedVehicles)
  }

  const handleDelete = (id: number) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id)
    onChange(updatedVehicles)
  }

  return (
    <>
      <h1 className='title'>Список автомобилей</h1>
      <div className='column mb-2'>
        <button
          className='btn btn-primary me-2 sort-button'
          onClick={() => handleSort('year')}>
          Год выпуска{' '}
          {sortBy === 'year' && (
            <i
              className={`bi bi-caret-${
                sortDirection === 'asc' ? 'up' : 'down'
              }-fill sort-icon`}></i>
          )}
        </button>
        <button
          className='btn btn-primary me-2 sort-button'
          onClick={() => handleSort('price')}>
          Стоимость{' '}
          {sortBy === 'price' && (
            <i
              className={`bi bi-caret-${
                sortDirection === 'asc' ? 'up' : 'down'
              }-fill sort-icon`}></i>
          )}
        </button>
        <button className='btn btn-warning me-2' onClick={onOpen}>
          Показать на карте
        </button>
      </div>
      <div className='row'>
        {sortedVehicles.map(vehicle => (
          <div className='col-md-4' key={vehicle.id}>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{vehicle.name}</h5>
                <p className='card-text'>Модель: {vehicle.model}</p>
                <p className='card-text'>Год выпуска: {vehicle.year}</p>
                <p className='card-text'>Стоимость: {vehicle.price} $</p>
                <button
                  className='btn btn-secondary m-2'
                  data-bs-toggle='modal'
                  data-bs-target={`#editModal${vehicle.id}`}>
                  Изменить
                </button>
                <EditModal onEdit={handleEdit} {...vehicle} />
                <button
                  className='btn btn-danger m-2'
                  onClick={() => handleDelete(vehicle.id)}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default VehiclesList
