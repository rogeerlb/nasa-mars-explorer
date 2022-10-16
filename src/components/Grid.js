import ImageViewer from './ImageViewer'
import { useEffect, useState } from 'react'
import '../styles/grid.css';

export default function Grid( {props} ) {
  const propsLength = Object.keys(props).length
  const [imagesPerLoad] = useState(40)
  const [gridImages, setGridImages] = useState([])

  const populate = () => {
    const indexIni = gridImages.length
    let indexFi = indexIni + imagesPerLoad
    if (indexFi > propsLength) indexFi = propsLength
    
    const images = []
    for (let i = indexIni; i < indexFi; i += 1) {
      images.push(<ImageViewer key={i} {...props[i]} />)
    }

    setGridImages(currentImages => {
      return currentImages.concat(images)
    })
  }

  useEffect(() => {
    populate()
  }, [])

  return (
    <div className="main">
      <div className="image-grid">
        {gridImages}
      </div>        
      {gridImages.length < propsLength && <button className='more-images' onClick={populate}>MORE IMAGES</button>}
    </div>
  )
}
