import './App.css';
import { useState } from 'react'
import Grid from './components/Grid'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { getPhotosByEarthDate, getPhotosBySol } from './services/getPhotos';

function App() {
  const [grid, setGrid] = useState('')

  const [camera, setCamera] = useState('all');
  const [earthDate, setEarthDate] = useState(new Date())
  const [sol, setSol] = useState()
  const [solType, setSolType] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    getPhotos(solType)
  };

  function getPhotos(isSolType) {
    if (isSolType) {
      const params = {
        sol: sol,
        camera: camera === 'all' ? null : camera
      }

      getPhotosBySol({params}).then((res) => {
        console.log("yo", res)
        setGrid(res.photos)
      }).catch(error => {
        console.log("error")
      })
    } else {
      const params = {
        earthDate: `${earthDate.getFullYear()}-${earthDate.getMonth() + 1}-${earthDate.getDate()}`,
        camera: camera === 'all' ? null : camera
      }

      getPhotosByEarthDate({params}).then((res) => {
        console.log("yo", res)
        setGrid(res.photos)
      }).catch(error => {
        console.log("error")
      })
    }
  }

  /*function isEmpty(text) {
    return (text == null || text === undefined || text === "")
  }*/

  return (
    <div className="App">
      <div className="param-selector">
        <form onSubmit={handleSubmit}>
          <input type="checkbox" checked={solType} onChange={event => setSolType(!solType)} />
          {!solType &&
            <>
              <label>Earth date:</label>
              <DatePicker selected={earthDate} onChange={date => setEarthDate(date)} showYearDropdown scrollableYearDropdown maxDate={new Date()} />
            </>
          }
          {solType &&
            <>
              <label>Sol:</label>
              <input type="text" onChange={event => setSol(event.target.value)} />
            </>
          }          
          <label>Camera:</label>
          <select onChange={event => setCamera(event.target.value)} value={camera}>
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
      <div className="image-viewer">
        {grid !== "" && <Grid {...grid} />}
      </div>
    </div>
  );
}

export default App;
