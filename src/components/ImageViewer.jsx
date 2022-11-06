export default function ImageViewer({ image }) {
  return (
    <div className="image-viewer">
      <a href={image.img_src} target="_blank" rel="noreferrer">
        <img src={image.img_src} alt=""></img>
      </a>
    </div>
  )
}
