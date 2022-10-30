import ImageViewer from "../ImageViewer/ImageViewer"
import { useEffect, useState } from "react"
import "./grid.css"

const IMAGES_PER_LOAD = 40

export default function Grid({ gridData }) {
  const gridDataLength = Object.keys(gridData).length
  const [gridImages, setGridImages] = useState([])

  const populate = () => {
    const indexIni = gridImages.length
    let indexFi = indexIni + IMAGES_PER_LOAD
    if (indexFi > gridDataLength) indexFi = gridDataLength

    const images = []
    for (let i = indexIni; i < indexFi; i += 1) {
      images.push(gridData[i])
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
        {gridImages.map((gridImage) => (
          <ImageViewer key={gridImage.id} image={gridImage} />
        ))}
      </div>
      {gridImages.length < gridDataLength && (
        <button className="more-images" onClick={populate}>MORE IMAGES</button>
      )}
    </div>
  )
}
