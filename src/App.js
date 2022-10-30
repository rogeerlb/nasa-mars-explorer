import './styles/App.css'
import { useState } from 'react'
import Grid from './components/Grid/Grid'
import Footer from './components/Footer/Footer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import getPhotos from './services/getPhotos'
import Loading from './components/Loading/Loading'

function App() {
  const [gridData, setGridData] = useState('')
  const [formParams, setFormParams] = useState({sol: "", solType: false, camera: "all", earthDate: new Date()})
  const [loading, setLoading] = useState(false)
  const [lastCall, setLastCall] = useState()

  const handleSubmit = (event) => {
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
          <input type="checkbox" checked={formParams.solType} onChange={() => setFormParams({...formParams, solType: !formParams.solType})} />
          {!formParams.solType &&
            <>
              <label>Earth date:</label>
              <DatePicker selected={formParams.earthDate} onChange={date => setFormParams({...formParams, earthDate: date})} showYearDropdown scrollableYearDropdown maxDate={new Date()} />
            </>
          }
          {formParams.solType &&
            <>
              <label>Sol:</label>
              <input type="text" onChange={event => setFormParams({...formParams, sol: event.target.value})} />
            </>
          }
          <label>Camera:</label>
          <select onChange={event => setFormParams({...formParams, camera: event.target.value})} value={formParams.camera}>
            <option value="all">All cameras</option>
            <option value="fhaz">Front Hazard Avoidance Camera</option>
            <option value="rhaz">Rear Hazard Avoidance Camera</option>
            <option value="mast">Mast Camera</option>
            <option value="chemcam">Chemistry and Camera Complex</option>
            <option value="mahli">Mars Hand Lens Imager</option>
            <option value="mardi">Mars Descent Imager</option>
            <option value="navcam">Navigation Camera</option>
            <option value="pancam">Panoramic Camera</option>
            <option value="minites">Miniature Thermal Emission Spectrometer (Mini-TES)</option>
          </select>
          <button type="submit">Submit form</button>
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
