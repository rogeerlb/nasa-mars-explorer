import { useState } from 'react'
import Grid from './components/Grid'
import Loading from './components/Loading'
import Footer from './components/Footer'
import DatePicker from 'react-datepicker'
import getPhotos from './services/getPhotos'
import cameras from './data/cameras'

function App() {
  const [gridData, setGridData] = useState('')
  const [formParams, setFormParams] = useState({sol: "", solType: false, camera: "all", earthDate: new Date()})
  const [loading, setLoading] = useState(false)
  const [lastCall, setLastCall] = useState()

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
      <div className="content">
        <div className="params-selector">
          <form className="params-selector__form" onSubmit={handleSubmit}>
            <div className="date-selector">
              <label className="date-selector__switch">
                <input type="checkbox" checked={formParams.solType} onChange={() => setFormParams({...formParams, solType: !formParams.solType})} />
                <label className="date-selector__switch-inner" data-on="Sol" data-off="Date" />
              </label>
              {!formParams.solType &&
                <DatePicker selected={formParams.earthDate} onChange={date => setFormParams({...formParams, earthDate: date})} showYearDropdown scrollableYearDropdown maxDate={new Date()} />
              }
              {formParams.solType &&
                <input type="text" placeholder='1000' onChange={event => setFormParams({...formParams, sol: event.target.value})} />
              }
              <span className="date-selector__info">?</span>
              <span className="date-selector__info-tooltip">Tooltip text</span>
            </div>            
            <div className="camera-selector">
              <div className="camera-selector__label">
                <p>Camera</p>
              </div>
              <select className="camera-selector__select" onChange={event => setFormParams({...formParams, camera: event.target.value})} value={formParams.camera}>
                {cameras.map((camera) => (
                  <option key={camera.id} value={camera.value}>{camera.name}</option>
                ))}
              </select>
              <span className="camera-selector__info">?</span>
              <span className="camera-selector__info-tooltip">Tooltip text</span>
            </div>          
            <button className="search-button">Search</button>
          </form>
        </div>
        {loading
          ? <Loading />
          : <Grid gridData={gridData} />
        }
      </div>
      <Footer />
    </div>
  )
}

export default App;
