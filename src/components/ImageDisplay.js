export default function Continents(props) {
    return (
      <div>
        <div className="image-viewer">
            <img src={props.img_src} alt=""></img>
            <p>Camera: {props.camera.name}</p>
            <p>Rover: {props.rover.name}</p>
        </div>
      </div>
    )
  }