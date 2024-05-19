import axios from 'axios'
import { Vehicle } from '../types/types'

const vehicleService = {
  get: async () => {
    const { data } = await axios.get<Vehicle[]>(
      'https://test.tspb.su/test-task/vehicles'
    )
    return data
  },
}

export default vehicleService
