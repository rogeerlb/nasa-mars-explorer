import axios from 'axios'
import { getApiUrl } from '../api_config'

export const getPhotosByEarthDate = ({params}) => {
  const { url, api_key } = getApiUrl()
  const send_params = {
    earth_date: params.earthDate,
    camera: params.camera,
    api_key: api_key
  }

  return axios.get(url, { params: send_params }).then(res => res.data)    
}

export const getPhotosBySol = ({params}) => {
  const { url, api_key } = getApiUrl()
  const send_params = {
    sol: params.sol,
    camera: params.camera,
    api_key: api_key
  }

  return axios.get(url, { params: send_params }).then(res => res.data)    
}
