import ImageDisplay from './ImageDisplay'

export default function Grid(props) {

    var images = []
    for (var i = 0; i < Object.keys(props).length; i += 1) {
        images.push(<ImageDisplay key={i} {...props[i]} />)
    }

    return (
        <div className="calendar">
            {images}
        </div>
    )
}
