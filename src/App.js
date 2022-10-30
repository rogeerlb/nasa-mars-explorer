import { useState } from 'react'
import Grid from './components/Grid'
import Loading from './components/Loading'
import Footer from './components/Footer'
import DatePicker from 'react-datepicker'
import getPhotos from './services/getPhotos'

function App() {
  const [gridData, setGridData] = useState('')
  const [formParams, setFormParams] = useState({sol: "", solType: false, camera: "all", earthDate: new Date()})
  const [loading, setLoading] = useState(false)
  const [lastCall, setLastCall] = useState()
  const cameras = require('./data/cameras.json')

  const handleSubmit = event => {
    event.preventDefault()

    if (lastCall !== formParams) {
      setLastCall(formParams)
      setLoading(true)
      getPhotos({formParams})
        .then((res) => {
          console.log("res", res)
          setLoading(false)
          setGridData(res)
        })
        .catch(error => {
          setLoading(false)
      })
    }    
  }

  return (
    <div className="App">
      <div className="param-selector">
        <form onSubmit={handleSubmit}>
          <div className="date-selector">
            <label class="btn-sol-switch">
              <input type="checkbox" checked={formParams.solType} onChange={() => setFormParams({...formParams, solType: !formParams.solType})} />
              <label className="btn-sol-switch-inner" data-on="Sol" data-off="Date" />
            </label>
            
            {!formParams.solType &&
              <DatePicker selected={formParams.earthDate} onChange={date => setFormParams({...formParams, earthDate: date})} showYearDropdown scrollableYearDropdown maxDate={new Date()} />

            }
            {formParams.solType &&
              <input type="text" placeholder='1000' onChange={event => setFormParams({...formParams, sol: event.target.value})} />
            }
          </div>
          <div className="camera-selector">
            <div className="camera-label">
              <p>Camera</p>
            </div>
            <select onChange={event => setFormParams({...formParams, camera: event.target.value})} value={formParams.camera}>
              {cameras.map((camera) => (
                <option value={camera.value}>{camera.name}</option>
              ))}
            </select>
          </div>          
          <button>Search</button>
        </form>
      </div>
      {loading
        ? <Loading />
        : <Grid gridData={gridData} />
      }      
      <Footer />
    </div>
  )
}

export default App;
