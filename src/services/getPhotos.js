import axios from 'axios'
import { getApiUrl } from '../api_config'

export default function getPhotos({ formParams }) {
  const { solType, sol, earthDate, camera } = formParams
  const { url, api_key } = getApiUrl()
    
  const send_params = {
    sol: solType ? sol : null,
    earth_date: solType ? null : `${earthDate.getFullYear()}-${earthDate.getMonth() + 1}-${earthDate.getDate()}`,
    camera: camera === 'all' ? null : camera,
    api_key: api_key
  }

  return axios.get(url, { params: send_params }).then(res => res.data.photos)    
}
