import { useState } from 'react'
import { Vehicle } from '../types/types'

interface props {
  id: number
  name: string
  model: string
  price: number
  onEdit: (id: number, newValue: Partial<Vehicle>) => void
}

const EditModal: React.FC<props> = ({ id, name, model, price, onEdit }) => {
  const [editedName, setEditedName] = useState(name)
  const [editedModel, setEditedModel] = useState(model)
  const [editedPrice, setEditedPrice] = useState(price)

  const handleSave = () => {
    onEdit(id, {
      name: editedName,
      model: editedModel,
      price: editedPrice,
    })
  }

  const myModalEl = document.getElementById(`editModal${id}`)
  myModalEl?.addEventListener('show.bs.modal', () => {
    setEditedModel(model)
    setEditedName(name)
    setEditedPrice(price)
  })

  return (
    <div
      className='modal fade'
      id={`editModal${id}`}
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex={-1}
      aria-labelledby={`editModalLabel${id}`}
      aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id={`editModalLabel${id}`}>
              Редактирование {name}
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form>
              <div className='mb-3'>
                <label htmlFor={`name${id}`} className='form-label'>
                  Наименование
                </label>
                <input
                  type='text'
                  className='form-control'
                  id={`name${id}`}
                  value={editedName}
                  onChange={e => setEditedName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor={`model${id}`} className='form-label'>
                  Модель
                </label>
                <input
                  type='text'
                  className='form-control'
                  id={`model${id}`}
                  value={editedModel}
                  onChange={e => setEditedModel(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor={`price${id}`} className='form-label'>
                  Стоимость
                </label>
                <input
                  type='number'
                  className='form-control'
                  id={`price${id}`}
                  value={editedPrice}
                  onChange={e => setEditedPrice(+e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'>
              Отмена
            </button>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-dismiss='modal'
              onClick={handleSave}>
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal
