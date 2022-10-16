import '../styles/image-viewer.css';
/*
  <div className="image-details">
        <p>Camera: {props.camera.name}</p>
        <p>Rover: {props.rover.name}</p>
        <p>Earth date: {props.earth_date}</p>
        <p>Sol: {props.sol}</p>
      </div>
*/
export default function ImageViewer(props) {
  return (
    <div className="image-viewer">
      <a href={props.img_src} target="_blank" rel="noreferrer">
        <img src={props.img_src} alt=""></img>
      </a>
    </div>
  )
}
